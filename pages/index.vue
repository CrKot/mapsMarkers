<template>
  <v-container fluid>
    <client-only>
      <l-map ref="map" style="height: 600px" :zoom="zoom" :center="center">
        <l-tile-layer :url="url"></l-tile-layer>
        <l-marker
          v-for="object in objects"
          :key="object.id"
          :lat-lng="getValidPositionPointName(object)"
          @click="goToMarker(object), selectIActiveItem(object.id)"
        ></l-marker>
        <l-control position="topright" style="height: 10%">
          <v-card flat rounded="lg" height="20%">
            <v-list dense>
              <v-list-item-title class="title">Объекты</v-list-item-title>
              <v-list-item-action>
                <v-text-field v-model="search" label="поиск" />
              </v-list-item-action>
              <v-list-item-group mandatory no-action>
                <v-list-item
                  v-for="object in getObjectsList()"
                  :key="object.id"
                  ref="mapObjects"
                  color="primary"
                  :data-key="object.id"
                  @click="goToMarker(object), selectIActiveItem(object.id)"
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
  methods: {
    selectIActiveItem(id) {
      this.activeItem = id
    },
    getValidPositionPointName(marker) {
      return {
        lat: marker.latitude,
        lng: marker.longitude,
      }
    },
    disableActiveMarker() {
      try {
        const activeMarker = this.$refs.mapObjects.find((el) => el.isActive)
        activeMarker.isActive = false
      } catch {
        this.search = ''
      }
    },
    setActiveMarker(object) {
      try {
        const marker = this.$refs.mapObjects.find(
          (el) => el.$attrs['data-key'] === object.id
        )
        marker.isActive = true
      } catch {
        this.search = ''
      }
    },
    goToMarker(object) {
      this.disableActiveMarker()
      this.setActiveMarker(object)
      const positionPoint = this.getValidPositionPointName(object)
      this.$refs.map.mapObject.setView(
        [positionPoint.lat, positionPoint.lng],
        10
      )
    },
    getObjectsList() {
      const objects = this.objects
      const search = this.search
      if (!search) {
        return objects
      }
      const filteredObjects = objects.filter((object) => {
        const name = object.name.toLowerCase()
        const targetSearch = search.toLowerCase()
        return name.includes(targetSearch)
      })
      return filteredObjects
    },
  },
}
</script>
