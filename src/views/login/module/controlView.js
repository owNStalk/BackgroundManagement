import {reactive} from "vue";

const stateGroup = reactive({
        value: true,
        type: 'password',
        icon: 'view',
})
const changeState = () => {
        stateGroup.valve =! stateGroup.valve
        stateGroup.valve ? stateGroup.type = 'password' : stateGroup.type = 'text'
        stateGroup.valve ? stateGroup.icon = 'view' : stateGroup.icon = 'hide'
}

export {stateGroup,changeState}