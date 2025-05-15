export default function useEnv () {
  const {
    MODE,
    VITE_APP_BACKEND_HOST,
    VITE_APP_FILE_SERVER_HOST,
    VITE_USE_LOCAL_MOCK,
    VITE_USE_PROD_MOCK,
  } = import.meta.env

  return {
    MODE,
    VITE_APP_BACKEND_HOST,
    VITE_APP_FILE_SERVER_HOST,
    VITE_USE_LOCAL_MOCK,
    VITE_USE_PROD_MOCK,
  }
}
