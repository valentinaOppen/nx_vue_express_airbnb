import Swal from 'sweetalert2'

export const useSwal = (
  title: string,
  text: any,
  icon: 'error' | 'success' | 'warning' | 'info' | 'question',
  button: string
) => {
  Swal.fire({
    title: title,
    text: typeof(text) === 'object' && text.length > 1 ? text.join('. ') : text,
    icon: icon,
    confirmButtonText: button
  })
};
