<template>
  <v-container fluid>
    <client-only>
      <l-map ref="map" style="height: 600px" :zoom="zoom" :center="center">
        <l-tile-layer :url="url"></l-tile-layer>
        <l-marker
          v-for="object in objects"
          :key="object.id"
          :lat-lng="getValidPositionPointName(object)"
          @click="goToMarker(object)"
        ></l-marker>
        <l-control position="topright">
          <v-card flat rounded="lg">
            <v-list dense>
              <v-list-item-title class="title">Объекты</v-list-item-title>
              <v-list-item-action>
                <v-text-field v-model="search" label="поиск" />
              </v-list-item-action>
              <v-list-item-group mandatory no-action>
                <v-list-item
                  v-for="object in filteredMarkersList"
                  :key="object.id"
                  ref="mapObjects"
                  color="primary"
                  :data-key="object.id"
                  @click="goToMarker(object)"
                >
                  <v-list-item-content>
                    <v-list-item-title v-text="object.name" />
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card>
        </l-control>
      </l-map>
    </client-only>
  </v-container>
</template>

<script>
import listOfObjects from '~/util/listOfObjects.js'

export default {
  data() {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      search: '',
      zoom: 15,
      objects: listOfObjects,
      center: this.getValidPositionPointName(listOfObjects[0]),
      activeItem: null,
    }
  },
  computed: {
    filteredMarkersList() {
      if (!this.search) return this.objects
      return this.objects.filter((object) => {
        const name = object.name.toLowerCase()
        const targetSearch = this.search.toLowerCase()
        return name.includes(targetSearch)
      })
    },
  },
  methods: {
    getValidPositionPointName(marker) {
      return {
        lat: marker.latitude,
        lng: marker.longitude,
      }
    },
    nextActiveMarker(object) {
      const activeMarker = this.$refs.mapObjects.find((el) => el.isActive)
      activeMarker.isActive = false
      const marker = this.$refs.mapObjects.find(
        (el) => el.$attrs['data-key'] === object.id
      )
      marker.isActive = true
    },
    goToMarker(object) {
      this.nextActiveMarker(object)
      this.activeItem = object.id
      const positionPoint = this.getValidPositionPointName(object)
      this.$refs.map.mapObject.setView(
        [positionPoint.lat, positionPoint.lng],
        10
      )
    },
  },
}
</script>
