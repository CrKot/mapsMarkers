import Vue from 'vue'
import {
  LMap,
  LTileLayer,
  LMarker,
  LControl,
  LControlLayers,
} from 'vue2-leaflet'
import 'leaflet/dist/leaflet.css'
import { Icon } from 'leaflet'

delete Icon.Default.prototype._getIconUrl
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
})

Vue.component('LMap', LMap)
Vue.component('LTileLayer', LTileLayer)
Vue.component('LMarker', LMarker)
Vue.component('LControl', LControl)
Vue.component('LControlLayers', LControlLayers)