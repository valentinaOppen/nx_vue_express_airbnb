const isAuthenticatedGuard = async (to:any, from:any, next:any) => {
  console.log("AUTH")
  const ok  = false;
  if(ok) next()
  else next({ name: 'register' })
}

export default isAuthenticatedGuard;