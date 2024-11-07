import { FC } from 'react';
import { useAppSelector } from '../../../hooks';
import { NoAuth } from '../no-auth/no-auth.page';
import { Functional } from '../../../core/enums/functional.enum';
import { Flex } from 'antd';
import { TitleElement } from './title.element';

type TProps = {
  Jsx: FC<{ functionals?: Functional[] }>;
  functionals?: Functional[];
}

export const BasePage = ({ Jsx, functionals }: TProps) => {
  const {
    expired
  } = useAppSelector(x => x.user);

  if (expired !== null && expired < Date.now()) {
    return (
      <NoAuth />
    )
  } else {
    return (
      <Flex vertical style={{ width: '100%', overflowY: 'auto' }}>
        <TitleElement />
        <Jsx functionals={functionals} />
      </Flex>
    )
  }

}