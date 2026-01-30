// Import configs for BB
import { BBDeAccConfig } from './BB/DE/acc.config'
import { BBDeDevConfig } from './BB/DE/dev.config'
import { BBDeProdConfig } from './BB/DE/prod.config'
import { BBDeTauConfig } from './BB/DE/tau.config'
import { BBDeTstConfig } from './BB/DE/tst.config'

// Import configs for LAB
import { LABPreConfig } from './LAB/pre.config'
import { LABProdConfig } from './LAB/prod.config'
import { LABSecConfig } from './LAB/sec.config'
import { LABStgConfig } from './LAB/stg.config'
import { LABDemoConfig } from './LAB/demo.config'
import { LABApiConfig } from './LAB/api.config'

// Export all environment configurations
export const envConfigs = {
    // BB Environments
    BBDeAcc: BBDeAccConfig,
    BBDeDev: BBDeDevConfig,
    BBDeProd: BBDeProdConfig,
    BBDeTau: BBDeTauConfig,
    BBDeTst: BBDeTstConfig,

    // LAB
    LABPre: LABPreConfig,
    LABProd: LABProdConfig,
    LABSec: LABSecConfig,
    LABStg: LABStgConfig,
    LABDemo: LABDemoConfig,
    LABApi: LABApiConfig,
}
