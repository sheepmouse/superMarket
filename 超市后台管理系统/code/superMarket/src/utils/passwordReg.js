export  function passwordReg(val) {
    var reg = /^(\w){6,20}$/
    return reg.test(val)
}
