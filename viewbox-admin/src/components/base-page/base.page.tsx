import { FC } from 'react';
import { useAppSelector } from '../../hooks'
import { NoAuth } from '../no-auth/no-auth.page';
import { Subpage } from '../../core/enums/subpages.enum';
import { Functional } from '../../core/enums/functional.enum';

type TProps = {
  Jsx: FC<{ subpages?: Subpage[], functionals?: Functional[] }>;
  subpages?: Subpage[];
  functionals?: Functional[];
}

export const BasePage = ({ Jsx, subpages, functionals }: TProps) => {
  const {
    expired
  } = useAppSelector(x => x.user);

  if (expired !== null && expired < Date.now()) {
    return (
      <NoAuth />
    )
  } else {
    return (
      <Jsx subpages={subpages} functionals={functionals} />
    )
  }

}