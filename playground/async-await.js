const add = (a,b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (a < 0 || b < 0) {
        return reject('numbers must be non negative')
      }
      
      resolve(a + b )
    }, 1000)
  })
}

const doWork = async () => {
  const sum = await add(1, 4)
  const sum2 = await add(sum, 4)
  const sum3 = await add(sum2, 4)
  
  // console.log(sum2)
  // console.log(sum3)
  return sum3
}

doWork().then((result) => {
  console.log(result)
}).catch((error) => {
  console.log(error)
})