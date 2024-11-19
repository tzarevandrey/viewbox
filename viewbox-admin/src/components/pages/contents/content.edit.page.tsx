import { useNavigate, useParams } from 'react-router-dom';
import { Functional } from '../../../core/enums/functional.enum';
import { useAppDispatch } from '../../../hooks';
import { setTitle } from '../../../reducers/title.slice';
import { useGetContentQuery, useUpdateContentMutation } from '../../../api/content.api';
import { useEffect } from 'react';
import { ContentLoadingPage } from './content.loading.page';
import { ContentErrorPage } from './content.error.page';
import { Button, Flex, Form, Input } from 'antd';
import { ContentType } from '../../../core/enums/content.enum';
import TextArea from 'antd/es/input/TextArea';

type TProps = {
  functionals?: Functional[];
}

type TParams = {
  id: string;
}

type TCustom = {
  value?: ContentType;
}

const CustomItem = ({ value }: TCustom) => {
  let result = ''
  switch (value) {
    case ContentType.Picture: result = 'Изображение';
      break;
    case ContentType.Video: result = 'Видео';
      break;
    case ContentType.WebPage: result = 'Веб-страница';
      break;
  }
  return <Input disabled value={result} />
}

export const ContentEdit = ({ functionals }: TProps) => {
  const { id: contentId } = useParams<TParams>();

  const navigate = useNavigate();

  const [updateContent] = useUpdateContentMutation();

  const {
    data: content,
    isLoading: contentLoading,
    isError: contentLoadingError
  } = useGetContentQuery(contentId ? +contentId : 0);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setTitle('Элемент контента'))
    // eslint-disable-next-line
  }, [content])

  if (contentLoading) return <ContentLoadingPage />

  if (contentLoadingError) return <ContentErrorPage />
  return (
    <Form
      layout='vertical'
      initialValues={{
        'contentType': content?.contentType,
        'name': content?.name,
        'description': content?.description || undefined
      }}
      onFinish={(values) => {
        updateContent({ name: content?.name, ...values, id: content?.id });
        navigate(-1);
      }}
      onReset={() => navigate(-1)}
    >
      <Form.Item
        name='contentType'
        label='Тип контента'
      >
        <CustomItem />
      </Form.Item>
      {content?.contentType === ContentType.WebPage ? (
        <Form.Item
          label='Ссылка'
          name='name'
          rules={[
            { required: true, message: 'Обязательное поле' },
            { type: 'url', message: 'Значение должно быть ссылкой' }
          ]}
        >
          <Input autoComplete='off' />
        </Form.Item>
      ) : (content?.contentType === ContentType.Picture ? (
        <Form.Item label='Имя файла'>
          <Input disabled value={content?.imageItem?.originalName} />
        </Form.Item>
      ) : (
        <Form.Item label='Имя файла'>
          <Input disabled value={content?.videoItem?.originalName} />
        </Form.Item>
      ))}
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

