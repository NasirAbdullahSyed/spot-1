import navigationService from './NavigationService'
import { setState } from 'playroomkit'

export const navigate = (route, props, broadcast = true) => {
    const actionTimestamp = Date.now()

    const state = { ...props, actionTimestamp }

    navigationService.navigate(route, { state })

    if (broadcast) {
        setState(
            'router',
            {
                route,
                state
            },
            true
        )
    }
}
