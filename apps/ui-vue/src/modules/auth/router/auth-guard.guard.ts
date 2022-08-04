const isAuthenticatedGuard = async (to:any, from:any, next:any) => {  
  const user = JSON.stringify(localStorage.getItem('user'))
  if(user) next()
  else next({ name: 'login' })
}

export default isAuthenticatedGuard;