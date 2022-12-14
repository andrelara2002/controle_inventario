const userApi = new UserApi()


const submit_button = document.getElementById('button_cadastrar')

const username_input = document.getElementById('username')
const password_input = document.getElementById('password')
const email_input = document.getElementById('email')
const id_register = document.getElementById('id_register')

submit_button && submit_button.addEventListener('click', () => {
    const username = id_register.value
    const password = password_input.value
    const email = email_input.value
    const name = username_input.value

    const body = { username, password, email, name, tipo: '', oficina: '' }

    
    userApi.registerUser(body, (
        res => {
            const [response, error] = res
            if (error) {
                console.error(error)
            }
            else {
                localStorage.setItem('user', JSON.stringify(body))
                alert('Usuario Registrado')
                window.location.href = '../home/home.html'
            }
        }
    ))
})