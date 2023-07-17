import navigationService from './NavigationService'
import { setState } from 'playroomkit'

export const navigate = (state, props, broadcast = true) => {
    const actionTimestamp = Date.now()

    navigationService.navigate(state, { state: { ...props, actionTimestamp } })

    if (broadcast) {
        setState(
            'router',
            {
                state,
                props,
                actionTimestamp,
            },
            true
        )
    }
}
