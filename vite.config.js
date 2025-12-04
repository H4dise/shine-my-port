import { deflineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
//  https://vitejs.dev/config/
export default deflineConfig({

   Plugins : [ vue ()],
   base : "/shine-my-port"
})