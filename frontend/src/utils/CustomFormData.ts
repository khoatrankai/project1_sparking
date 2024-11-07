const CustomFormData = (values:Record<string, unknown>)=>{
    console.log(values)
    const formData = new FormData()
    Object.keys(values).map(dt=>{
        console.log(dt)
        const value = values[dt];
        console.log(Array.isArray(value),dt)
        if(Array.isArray(value)){
            // console.log(value)
            value.map((dtt)=>{
                // console.log(dtt)
                formData.append(dt,dtt)
            })
        }else {
            formData.append(dt,String(value))
        }
    })
    return formData
} 

export default CustomFormData