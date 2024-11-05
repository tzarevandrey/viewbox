import { useSnackbar } from 'notistack';

let useSnackbarRef: any;

const setUseSnackbarRef = (useSnackbarRefProp: any) => {
  useSnackbarRef = useSnackbarRefProp;
}

function InnerSnackbarUtilsConfigurator({ setUseSnackbarRefs }: any) {
  setUseSnackbarRefs(useSnackbar());
  return null;
}

export function SnackbarUtilsConfigurator() {
  return (
    <InnerSnackbarUtilsConfigurator setUseSnackbarRefs={setUseSnackbarRef} />
  )
}

export const snack = {
  success(msg: string) {
    this.toast(msg, 'success');
  },
  warning(msg: string) {
    this.toast(msg, 'warning');
  },
  info(msg: string) {
    this.toast(msg, 'info');
  },
  error(msg: string) {
    this.toast(msg, 'error');
  },
  toast(msg: string, variant = 'default') {
    useSnackbarRef.enqueueSnackbar(msg, { variant });
  }
}