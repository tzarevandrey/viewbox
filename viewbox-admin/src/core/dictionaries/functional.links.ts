import { Functional } from "../enums/functional.enum";

export const FUNCTIONAL_LINKS: { functional: Functional, link: string }[] = [
  {
    functional: Functional.Create,
    link: '_add'
  },
  {
    functional: Functional.Read,
    link: '_view'
  },
  {
    functional: Functional.Update,
    link: '_edit'
  },
  {
    functional: Functional.Delete,
    link: '_del'
  }
]