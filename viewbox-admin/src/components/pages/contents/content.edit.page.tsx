import { useNavigate, useParams } from 'react-router-dom';
import { Functional } from '../../../core/enums/functional.enum';
import { useAppDispatch } from '../../../hooks';
import { setTitle } from '../../../reducers/title.slice';
import { useGetContentQuery, useUpdateContentMutation } from '../../../api/content.api';
import { useEffect } from 'react';
import { Button, Flex, Form, Input } from 'antd';
import { ContentType } from '../../../core/enums/content.enum';
import TextArea from 'antd/es/input/TextArea';
import { Loading } from '../../shared/loading/loading.page';
import { Error } from '../../shared/error/error.page';

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
    let name = '';
    try {
      switch (content?.contentType) {
        case ContentType.Picture: name = `«${content.imageItem?.originalName}»` ?? name;
          break;
        case ContentType.Video: name = `«${content.videoItem?.originalName}»` ?? name;
          break;
        case ContentType.WebPage: name = `«${content.name}»` ?? name;
          break;
      }
    } catch { }
    dispatch(setTitle(`Элемент контента ${name}`))
    // eslint-disable-next-line
  }, [content])

  if (contentLoading) return <Loading />
  if (contentLoadingError) return <Error />

  return (
    <Form
      layout='vertical'
      initialValues={{
        'contentType': content?.contentType,
        'name': content?.name,
        'description': content?.description ?? undefined
      }}
      onFinish={async (values) => {
        try {
          await updateContent({ name: content?.name, ...values, id: content?.id }).unwrap();
          navigate(-1);
        } catch { }
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

