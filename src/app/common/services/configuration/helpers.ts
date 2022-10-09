import { firstValueFrom, of } from "rxjs"

import { 
	appSettings 
} from "~config/environments/dev/headless/responses/get-configuration.appSettings"
import { apiDelay } from "~common/utilities/api-delay"
import { environment } from "~/environments/environment"


export const developmentAppInitialize = {
	override: environment.isHeadless, 
	factoryResponse: dummyInitialize
}

export async function dummyInitialize(this: {configuration: any}) {
	this.configuration = await firstValueFrom(of(appSettings).pipe(apiDelay))
	console.log('[AppConfigurationService] configuration', this.configuration)
}
