import { Button, Flex, Form, FormInstance, Input, Select } from 'antd';
import { useAppDispatch } from '../../../hooks';
import { setTitle } from '../../../reducers/title.slice';
import { useAddContentMutation } from '../../../api/content.api';
import { useEffect } from 'react';
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
  return (
    <Form
      layout='vertical'
      encType='multipart/form-data'
      onFinish={(values) => {
        console.log(values)
        addContent(values);
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
        shouldUpdate={(prevValues, currentValues) => prevValues.contentType !== currentValues.contentType}
      >
        {({ getFieldValue, setFieldValue }: FormInstance<TCreateContentDto>) => {
          // setFieldValue('file', '');
          const contType = getFieldValue('contentType') || ContentType.WebPage;
          switch (contType) {
            case ContentType.Picture: return (
              <Form.Item name='file'>
                <Input type='file' accept='image/png, image/jpeg, image/jpg, image/bmp' />
              </Form.Item>
            )
            case ContentType.Video: return (
              <Form.Item name='file'>
                <Input type='file' accept='video/mp4, video/mpeg, video/mov' />
              </Form.Item>
            )
            case ContentType.WebPage: return (
              <Form.Item
                name='name'
                label='Ссылка'
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