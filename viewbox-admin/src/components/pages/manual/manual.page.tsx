import { URLS } from '../../../core/constants/urls'

export const Manual = () => {
  return (
    <iframe
      style={{ border: 0, width: '100%' }}
      src={`${URLS.BASE_API}/manual.pdf`}
      title='Руководство пользователя'
    />
  )
}