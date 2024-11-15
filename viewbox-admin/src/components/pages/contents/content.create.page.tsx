import { Button, Card, Flex, Form, FormInstance, Input, Select, Upload, UploadProps, message } from 'antd';
import { useAppDispatch } from '../../../hooks';
import { setTitle } from '../../../reducers/title.slice';
import { useAddContentMutation } from '../../../api/content.api';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContentType } from '../../../core/enums/content.enum';
import { TCreateContentDto } from './dto/create.content.dto';
import { UploadOutlined } from '@ant-design/icons';

export const ContentCreate = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setTitle('Новый контент'));
    // eslint-disable-next-line
  }, [])
  const [addContent] = useAddContentMutation();
  const imageProps: UploadProps = {
    beforeUpload: (file) => {
      const isCompatibleImage = ['image/png', 'image/jpeg', 'image/jpg', 'image/bmp'].includes(file.type);
      if (!isCompatibleImage) {
        message.error(`${file.name} недопустимый формат изображения`);
      }
      return isCompatibleImage;
    },
    maxCount: 1,
  }
  const videoProps: UploadProps = {
    beforeUpload: (file) => {
      const isCompatibleVideo = ['video/mp4', 'video/mpeg4', 'video/mov'].includes(file.type);
      if (!isCompatibleVideo) {
        message.error(`${file.name} недопустимый формат видео`);
      }
      return isCompatibleVideo;
    },
    maxCount: 1,
  }
  return (
    <Form
      layout='vertical'
      onFinish={(values) => {
        addContent(values);
        navigate(-1);
      }}
      onReset={() => navigate(-1)}
    >
      <Form.Item
        label='Тип контента'
        name='contentType'
      >
        <Select defaultValue={ContentType.WebPage}>
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
        {({ getFieldValue }: FormInstance<TCreateContentDto>) => {
          const contType = getFieldValue('contentType') || ContentType.WebPage;
          switch (contType) {
            case ContentType.Picture: return (
              <Form.Item name='file'>
                <Upload {...imageProps}>
                  <Button icon={<UploadOutlined />}>Загрузить изображение</Button>
                </Upload>
              </Form.Item>
            )
            case ContentType.Video: return (
              <Form.Item name='file'>
                <Upload {...videoProps}>
                  <Button icon={<UploadOutlined />}>Загрузить видео</Button>
                </Upload>
              </Form.Item>
            )
            case ContentType.WebPage: return (
              <Form.Item
                name='name'
              >
                <Input />
              </Form.Item>
            )
          }
        }}
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