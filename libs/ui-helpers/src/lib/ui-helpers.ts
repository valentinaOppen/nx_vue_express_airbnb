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


export const swalError = (error:any, title?:string) => {
  useSwal(title ? title : 'Error!', error ? error : 'Something went wrong','error', 'Retry');
  
}

export const swalSuccess = (title:string, msg: string) => {
  useSwal('Saved!', msg, 'success', 'Ok');      
}

export const swalInfo = (title:string, msg:string) => {
  useSwal(title, msg, 'info', 'Ok');
}

