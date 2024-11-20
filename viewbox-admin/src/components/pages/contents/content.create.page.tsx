import { Button, Flex, Form, FormInstance, Input, Select, Upload } from 'antd';
import { useAppDispatch } from '../../../hooks';
import { setTitle } from '../../../reducers/title.slice';
import { useAddContentMutation } from '../../../api/content.api';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContentType } from '../../../core/enums/content.enum';
import { TCreateContentDto } from './dto/create.content.dto';
import TextArea from 'antd/es/input/TextArea';

export const ContentCreate = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setTitle('Новый контент'));
    // eslint-disable-next-line
  }, [])

  const [addContent] = useAddContentMutation();

  const [file, setFile] = useState<any[]>([]);

  return (
    <Form
      layout='vertical'
      encType='multipart/form-data'
      onFinish={(values) => {
        const formData = new FormData();
        Object.entries(values).forEach(entry => { if (entry[1]) formData.append(entry[0], `${entry[1]}`) })
        if (file[0]) formData.set('file', file[0].originFileObj)
        addContent(formData);
        navigate(-1);
      }}
      onReset={() => navigate(-1)}
    >
      <Form.Item
        label='Тип контента'
        name='contentType'
        initialValue={ContentType.WebPage}
      >
        <Select>
          <Select.Option
            value={ContentType.WebPage}
            key={ContentType.WebPage}
          >Веб-страница</Select.Option>
          <Select.Option
            value={ContentType.Video}
            key={ContentType.Video}
          >Видео</Select.Option>
          <Select.Option
            value={ContentType.Picture}
            key={ContentType.Picture}
          >Изображение</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) => {
          if (prevValues.contentType !== currentValues.contentType) setFile([]);
          return (prevValues.contentType !== currentValues.contentType)
        }}
      >
        {({ getFieldValue }: FormInstance<TCreateContentDto>) => {
          const contType = getFieldValue('contentType') || ContentType.WebPage;
          switch (contType) {
            case ContentType.Picture: return (
              <Form.Item
                name='file'
                rules={[
                  () => ({
                    validator() {
                      if (file.length === 0) return Promise.reject('Необходим файл изображения');
                      return Promise.resolve();
                    }
                  })
                ]}
              >
                <Upload
                  accept='.png, .jpg, .jpeg, .bmp'
                  fileList={file}
                  showUploadList={{
                    showDownloadIcon: false,
                    showRemoveIcon: false,
                  }}
                  maxCount={1}
                  onChange={({ fileList }) => {
                    setFile(fileList)
                  }}
                  beforeUpload={() => {
                    return false;
                  }}
                >
                  <Button>Загрузить</Button>
                </Upload>
              </Form.Item>
            )
            case ContentType.Video: return (
              <Form.Item
                name='file'
                rules={[
                  () => ({
                    validator: async () => {
                      if (file.length === 0) return Promise.reject('Необходим видео-файл');
                      return Promise.resolve();
                    }
                  })
                ]}
              >
                <Upload
                  accept='.mp4, .mpeg, .mov'
                  fileList={file}
                  showUploadList={{
                    showDownloadIcon: false,
                    showRemoveIcon: false,
                  }}
                  maxCount={1}
                  onChange={({ fileList }) => {
                    setFile(fileList)
                  }}
                  beforeUpload={() => {
                    return false;
                  }}
                >
                  <Button>Загрузить</Button>
                </Upload>
              </Form.Item>
            )
            case ContentType.WebPage: return (
              <Form.Item
                name='name'
                label='Ссылка'
                rules={[
                  { required: true, message: 'Обязательное значение' },
                  { type: 'url', message: 'Значение должно быть ссылкой' }
                ]}
              >
                <Input type='text' autoComplete='off' />
              </Form.Item>
            )
          }
        }}
      </Form.Item>
      <Form.Item
        label='Описание'
        name='description'
      >
        <TextArea rows={6} autoComplete='off' />
      </Form.Item>
      <Flex className='buttons-block'>
        <Button
          type='default'
          htmlType='reset'
        >Отмена</Button>
        <Button
          type='primary'
          htmlType='submit'
        >Сохранить</Button>
      </Flex>
    </Form>
  )
}