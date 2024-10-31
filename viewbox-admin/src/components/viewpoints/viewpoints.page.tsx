import { Functional } from '../../core/enums/functional.enum';
import { Subpage } from '../../core/enums/subpages.enum';

type TProps = {
  subpages?: Subpage[];
  functionals?: Functional[];
}

export const Viewpoints = ({ subpages, functionals }: TProps) => {
  return (
    <div>viewpoints</div>
  )
}