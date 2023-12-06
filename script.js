let validator = {
    initalValidator: (event)=>{
        event.preventDefault()
        let send = true

        let inputs = form.querySelectorAll('input')

        validator.clearError()

        for(let input of inputs){
            let check = validator.checkList(input)
            if(check !== true){
                send = false
                validator.showError(input, check)
            }
        }

        if(send){
            let info = document.querySelector('.info')
            info.style.display = 'none'
            document.querySelector('.pos').style.opacity = 0
            document.querySelector('.pos').style.display = 'flex'
            setTimeout(() => {
               document.querySelector('.pos').style.opacity = 1 
            }, 200);
        }
    },
    checkList: (input) =>{
        let rules = input.getAttribute('data-rules')

        if(rules !== null){
            rules = rules.split('|')
            for(let k in rules){
                let details = rules[k].split('=')
                switch(details[0]){
                    case 'required':
                        if(input.value == ''){
                            return `Campo obrigatório`
                        }
                    break
                    case 'min':
                        if(input.value.length < details[1]){
                            return `Mínimo de ${details[1]} caractere`
                        }
                    break
                    case 'email':
                        if(input.value !== ''){
                            regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                            if(!regex.test(input.value.toLowerCase())){
                                return `E-mail inválido`
                            }
                        }
                    break
                }
            }          
        }
        return true
    },
    showError: (input, error) => {
        input.style.borderColor = '#FF0000'
        input.style.marginBottom = 0

        let elementDiv = document.createElement('div')
        elementDiv.classList.add('error')
        elementDiv.innerHTML = error

        input.parentElement.insertBefore(elementDiv, input.ElementSibling)
    },
    clearError: () =>{
        let inputs = form.querySelectorAll('input')
        for(let i = 0; i<inputs.length; i++){
            inputs[i].style = ''
        }

        let elementDiv = document.querySelectorAll('.error')
        for(let e = 0; e<elementDiv.length; e++){
            elementDiv[e].remove()
        }
    }
}

let form = document.querySelector('.form')
form.addEventListener('submit', validator.initalValidator)

