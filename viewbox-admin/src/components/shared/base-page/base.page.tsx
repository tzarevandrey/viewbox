import { FC } from 'react';
import { useAppSelector } from '../../../hooks'
import { NoAuth } from '../no-auth/no-auth.page';
import { Subpage } from '../../../core/enums/subpages.enum';
import { Functional } from '../../../core/enums/functional.enum';
import { Flex } from 'antd';
import { TitleElement } from './title.element';

type TProps = {
  Jsx: FC<{ token: string, subpages?: Subpage[], functionals?: Functional[] }>;
  token: string;
  subpages?: Subpage[];
  functionals?: Functional[];
}

export const BasePage = ({ Jsx, token, subpages, functionals }: TProps) => {
  const {
    expired
  } = useAppSelector(x => x.user);

  if (expired !== null && expired < Date.now()) {
    return (
      <NoAuth />
    )
  } else {
    return (
      <Flex vertical style={{ width: '100%' }}>
        <TitleElement />
        <Jsx token={token} subpages={subpages} functionals={functionals} />
      </Flex>
    )
  }

}