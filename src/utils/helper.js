

export const authHeader =() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      return { 'x-access-token': user.token };
    } else {
      return {};
    }
}

export const getToken = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      return user.token;
    } else {
      return null;
    }
}

export const emptyFields = (data) =>{
  let keys = Object.keys(data)
  let values = Object.values(data)
  let fields = [];
  for(var item in values ){
    if(values[item] === "" || values[item]===null){
      fields.push(keys[item])
    }else{

    }
  }
  return fields;
}