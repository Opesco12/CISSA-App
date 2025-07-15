import * as Location from "expo-location";
import { Clock, Navigation, Star, X } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Keyboard,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import "react-native-get-random-values";
import MapView, { Marker, Polyline } from "react-native-maps";

import { combinedMarkers } from "@/constants/markers";

// DANGER
// DO NOT TOUCH THIS COMPONENT.

const GoogleMapsComponent = ({
  googleMapsApiKey = "AIzaSyACuKudhY0p5TPe9YUSWeYDaTEVnFBhou4",
}) => {
  const mapRef = useRef<MapView | null>(null);
  const placesAutocompleteRef = useRef(null);
  const [selectedCard, setSelectedCard] = useState("");
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [directions, setDirections] = useState<
    { latitude: number; longitude: number }[] | null
  >(null);
  const [loadingDirections, setLoadingDirections] = useState(false);

  // Places UI Kit related state
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [placeDetails, setPlaceDetails] = useState(null);
  const [loadingPlaceDetails, setLoadingPlaceDetails] = useState(false);
  const [showPlaceDetailsModal, setShowPlaceDetailsModal] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      console.log("Permission status is: ", status);
      if (status !== "granted") {
        setErrorMsg("Permission not granted");
        return;
      }

      try {
        let { coords } = await Location.getCurrentPositionAsync({});
        const region = {
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        };
        setLocation(region);
        console.log("Current coordinates: ", coords);
      } catch (error) {
        console.log("Location error: ", error);
        setErrorMsg("Failed to get location");
      }
    })();
  }, []);

  const fetchPlaceDetails = async (placeId: any) => {
    if (!placeId) return;

    setLoadingPlaceDetails(true);

    try {
      const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,formatted_address,formatted_phone_number,website,opening_hours,rating,price_level,photos,types&key=${googleMapsApiKey}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.status === "OK") {
        setPlaceDetails(data.result);
        setShowPlaceDetailsModal(true);
      } else {
        console.log("Place Details API error:", data.status);
        Alert.alert("Error", "Failed to fetch place details");
      }
    } catch (error) {
      console.error("Error fetching place details:", error);
      Alert.alert("Error", "Failed to fetch place details");
    } finally {
      setLoadingPlaceDetails(false);
    }
  };

  // Handle selecting a place from Places UI Kit autocomplete
  const handleSelectPlace = (
    data: any,
    details: {
      name?: string;
      place_id?: string;
      geometry?: { location: { lat: number; lng: number } };
      formatted_address?: string;
      types?: string[];
    } | null = null
  ) => {
    if (!details || !details?.geometry || !details?.geometry.location) {
      Alert.alert("Error", "Could not get place details.");
      return;
    }

    const placeLocation = {
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng,
    };

    // Set selected place and update map
    setSelectedPlace({
      name: details?.name,
      place_id: details?.place_id,
      coordinates: placeLocation,
      description: details?.formatted_address || "Selected location",
      types: details?.types || [],
    });

    // Animate map to the selected place
    mapRef.current?.animateToRegion(
      {
        ...placeLocation,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
      1000
    );

    Keyboard.dismiss();
  };

  const getDirections = async (destLat: number, destLng: number) => {
    if (!location) {
      Alert.alert("Error", "Your current location is not available");
      return;
    }

    setLoadingDirections(true);

    try {
      const origin = `${location.latitude},${location.longitude}`;
      const destination = `${destLat},${destLng}`;
      const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${googleMapsApiKey}&mode=driving`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.status === "OK" && data.routes.length > 0) {
        const points = decodePolyline(data.routes[0].overview_polyline.points);
        setDirections(points);

        const coordinates = [
          { latitude: location.latitude, longitude: location.longitude },
          { latitude: destLat, longitude: destLng },
        ];

        mapRef.current?.fitToCoordinates(coordinates, {
          edgePadding: { top: 100, right: 100, bottom: 300, left: 100 },
          animated: true,
        });
      } else {
        Alert.alert("Error", "Could not find directions");
      }
    } catch (error) {
      console.error("Error fetching directions:", error);
      Alert.alert("Error", "Failed to fetch directions");
    } finally {
      setLoadingDirections(false);
    }
  };

  const openInGoogleMaps = (destLat: number, destLng: number) => {
    if (!location) {
      Alert.alert("Error", "Your current location is not available");
      return;
    }

    const url = `https://www.google.com/maps/dir/?api=1&origin=${location.latitude},${location.longitude}&destination=${destLat},${destLng}&travelmode=driving`;
    // Linking.openURL(url);
  };

  const decodePolyline = (encoded: string) => {
    const poly = [];
    let index = 0,
      lat = 0,
      lng = 0;

    while (index < encoded.length) {
      let b,
        shift = 0,
        result = 0;

      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);

      const dlat = result & 1 ? ~(result >> 1) : result >> 1;
      lat += dlat;

      shift = 0;
      result = 0;

      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);

      const dlng = result & 1 ? ~(result >> 1) : result >> 1;
      lng += dlng;

      const point = {
        latitude: lat / 1e5,
        longitude: lng / 1e5,
      };

      poly.push(point);
    }

    return poly;
  };

  const clearSearch = () => {
    if (placesAutocompleteRef.current) {
      placesAutocompleteRef.current.clear();
    }
    setSelectedPlace(null);
    setDirections(null);
    setPlaceDetails(null);
  };

  const renderRatingStars = (rating: number) => {
    if (!rating) return null;

    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star
            key={i}
            size={16}
            color="#FFD700"
            fill="#FFD700"
          />
        );
      } else if (i === fullStars && halfStar) {
        stars.push(
          <Star
            key={i}
            size={16}
            color="#FFD700"
            fill="#FFD700"
            style={{ opacity: 0.5 }}
          />
        );
      } else {
        stars.push(
          <Star
            key={i}
            size={16}
            color="#FFD700"
            style={{ opacity: 0.3 }}
          />
        );
      }
    }

    return (
      <View style={{ flexDirection: "row", marginVertical: 5 }}>
        {stars}
        <Text style={{ marginLeft: 5 }}>{rating.toFixed(1)}</Text>
      </View>
    );
  };

  const renderPriceLevel = (priceLevel: number | undefined) => {
    if (priceLevel === undefined) return null;

    let priceText = "";
    for (let i = 0; i < priceLevel; i++) {
      priceText += "$";
    }

    return (
      <Text style={{ color: "#666", marginVertical: 5 }}>
        Price: {priceText}
      </Text>
    );
  };

  const renderOpeningHours = (openingHours: { open_now: any }) => {
    if (!openingHours) return null;

    return (
      <View
        style={{
          marginVertical: 5,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Clock
          size={16}
          color="#666"
          style={{ marginRight: 5 }}
        />
        <Text style={{ color: openingHours.open_now ? "#4CAF50" : "#F44336" }}>
          {openingHours.open_now ? "Open now" : "Closed"}
        </Text>
      </View>
    );
  };

  const renderPhotos = (photos: string | any[]) => {
    if (!photos || photos.length === 0) {
      return (
        <View style={styles.noPhotosContainer}>
          <Text style={styles.noPhotosText}>No photos available</Text>
        </View>
      );
    }

    return (
      <FlatList
        horizontal
        data={photos.slice(0, 3)}
        keyExtractor={(item, index) => `photo-${index}`}
        renderItem={({ item }) => (
          <Image
            source={{
              uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${item.photo_reference}&key=${googleMapsApiKey}`,
            }}
            style={styles.placePhoto}
          />
        )}
        showsHorizontalScrollIndicator={false}
        style={styles.photosList}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.searchContainer}>
        <GooglePlacesAutocomplete
          ref={placesAutocompleteRef}
          placeholder="Search for a place..."
          onPress={handleSelectPlace}
          fetchDetails={true}
          predefinedPlaces={[]}
          textInputProps={[]}
          query={{
            key: googleMapsApiKey,
            language: "en",
          }}
          enablePoweredByContainer={false}
          styles={{
            container: {
              flex: 1,
            },
            textInputContainer: {
              backgroundColor: "#fff",
              borderRadius: 25,
              height: 50,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
              top: 20,
            },
            textInput: {
              height: 50,
              fontSize: 16,
              borderRadius: 25,
              paddingHorizontal: 15,
            },
            listView: {
              backgroundColor: "#fff",
              marginTop: 5,
              borderRadius: 10,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
              position: "absolute",
              top: 45,
              zIndex: 1000,
            },
            row: {
              padding: 13,
              height: "auto",
              flexDirection: "row",
            },
            separator: {
              height: 1,
              backgroundColor: "#f0f0f0",
            },
            description: {
              fontSize: 14,
            },
            powered: { height: 0, opacity: 0 },
          }}
          renderLeftButton={() => (
            <View style={{ justifyContent: "center", marginLeft: 15 }}>
              <Search
                size={20}
                color="#666"
              />
            </View>
          )}
          renderRightButton={() =>
            selectedPlace ? (
              <TouchableOpacity
                style={{
                  justifyContent: "center",
                  marginRight: 15,
                  // height: 30,
                }}
                onPress={clearSearch}
              >
                <X
                  size={20}
                  color="#666"
                />
              </TouchableOpacity>
            ) : null
          }
        />
      </View> */}

      {!location ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            size="large"
            color="#000"
          />
          <Text style={{ marginTop: 10 }}>Loading map...</Text>
          {errorMsg && <Text style={{ color: "red" }}>{errorMsg}</Text>}
        </View>
      ) : (
        <MapView
          style={styles.map}
          ref={mapRef}
          initialRegion={location}
          showsUserLocation={true}
        >
          {/* {combinedMarkers.map((marker, index) => (
            <Marker
              key={marker.id || index}
              title={marker.name}
              coordinate={marker.coordinates}
              description={marker.description}
              onCalloutPress={() => {
                setSelectedCard(marker.name);
                openInGoogleMaps(
                  marker.coordinates.latitude,
                  marker.coordinates.longitude
                );
              }}
            >
              <View>
                <View style={styles.markerContainer}>
                  <View style={styles.markerDot} />
                </View>
                {marker.name === selectedCard && (
                  <View style={styles.calloutBubble}>
                    <Text style={styles.calloutText}>{marker.name}</Text>
                  </View>
                )}
              </View>
            </Marker>
          ))} */}

          {selectedPlace && (
            <Marker
              title={selectedPlace.name}
              coordinate={selectedPlace.coordinates}
              description={selectedPlace.description}
              onPress={() => {
                if (selectedPlace?.place_id) {
                  fetchPlaceDetails(selectedPlace.place_id);
                } else {
                  setPlaceDetails({
                    name: selectedPlace.name,
                    formatted_address: selectedPlace.description,
                  });
                  setShowPlaceDetailsModal(true);
                }
              }}
              pinColor="#FF5722"
            >
              <View>
                <View
                  style={[styles.markerContainer, styles.searchMarkerContainer]}
                >
                  <View style={[styles.markerDot, styles.searchMarkerDot]} />
                </View>
                <View style={styles.calloutBubble}>
                  <Text style={styles.calloutText}>{selectedPlace.name}</Text>
                </View>
              </View>
            </Marker>
          )}

          {directions && (
            <Polyline
              coordinates={directions}
              strokeWidth={5}
              strokeColor="#007BFF"
              lineDashPattern={[0]}
            />
          )}
        </MapView>
      )}

      {loadingDirections && (
        <View style={styles.directionsLoadingContainer}>
          <ActivityIndicator
            size="large"
            color="#007BFF"
          />
          <Text style={styles.directionsLoadingText}>
            Getting directions...
          </Text>
        </View>
      )}

      {loadingPlaceDetails && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            size="small"
            color="#007BFF"
          />
          <Text style={styles.searchingText}>Loading place details...</Text>
        </View>
      )}

      {/* Selected place card */}
      {selectedPlace && (
        <View style={styles.selectedPlaceContainer}>
          <View style={styles.selectedPlaceCard}>
            <View style={styles.placeInfoContainer}>
              <Text style={styles.selectedPlaceName}>{selectedPlace.name}</Text>
              <Text style={styles.selectedPlaceDescription}>
                {selectedPlace.description}
              </Text>
            </View>
            <View style={styles.placeButtonsContainer}>
              <TouchableOpacity
                style={styles.placeActionButton}
                onPress={() => {
                  if (selectedPlace.place_id) {
                    fetchPlaceDetails(selectedPlace.place_id);
                  } else {
                    setPlaceDetails({
                      name: selectedPlace.name,
                      formatted_address: selectedPlace.description,
                    });
                    setShowPlaceDetailsModal(true);
                  }
                }}
              >
                <Info
                  size={16}
                  color="#007BFF"
                />
                <Text style={styles.placeActionButtonText}>Details</Text>
              </TouchableOpacity>

              <Pressable
                style={styles.directionsButton}
                onPress={() =>
                  getDirections(
                    selectedPlace.coordinates.latitude,
                    selectedPlace.coordinates.longitude
                  )
                }
              >
                <Navigation
                  size={16}
                  color="#fff"
                />
                <Text style={styles.directionsButtonText}>Directions</Text>
              </Pressable>
            </View>
          </View>
        </View>
      )}

      <View style={styles.markerListContainer}>
        <FlatList
          horizontal
          data={combinedMarkers}
          keyExtractor={(item) => item.id || item.name}
          renderItem={({ item: marker }) => (
            <Pressable
              onPress={() => {
                setSelectedCard(marker.name);
                mapRef.current?.animateToRegion(
                  {
                    latitude: marker.coordinates.latitude,
                    longitude: marker.coordinates.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                  },
                  1000
                );
              }}
              style={
                marker.name === selectedCard
                  ? styles.activeMarkerButton
                  : styles.markerButton
              }
            >
              <Image
                source={{ uri: marker.image }}
                style={styles.markerImage}
              />
              <View style={styles.markerInfo}>
                <Text style={styles.markerName}>{marker.name}</Text>
                <Text style={styles.markerDescription}>
                  {marker.description}
                </Text>
                <Pressable
                  style={styles.directionsButton}
                  onPress={() =>
                    getDirections(
                      marker.coordinates.latitude,
                      marker.coordinates.longitude
                    )
                  }
                >
                  <Navigation
                    size={16}
                    color="#fff"
                  />
                  <Text style={styles.directionsButtonText}>Directions</Text>
                </Pressable>
              </View>
            </Pressable>
          )}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      {/* Place Details Modal */}
      <Modal
        visible={showPlaceDetailsModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowPlaceDetailsModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{placeDetails?.name}</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowPlaceDetailsModal(false)}
              >
                <X
                  size={24}
                  color="#333"
                />
              </TouchableOpacity>
            </View>

            {/* <View style={styles.modalBody}>
              {placeDetails?.photos && renderPhotos(placeDetails.photos)}

              {renderRatingStars(placeDetails?.rating)}
              {renderPriceLevel(placeDetails?.price_level)}

              {placeDetails?.formatted_address && (
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Address:</Text>
                  <Text style={styles.detailText}>
                    {placeDetails.formatted_address}
                  </Text>
                </View>
              )}

              {placeDetails?.formatted_phone_number && (
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Phone:</Text>
                  <Text style={styles.detailText}>
                    {placeDetails.formatted_phone_number}
                  </Text>
                </View>
              )}

              {renderOpeningHours(placeDetails?.opening_hours)}

              {placeDetails?.website && (
                <TouchableOpacity
                  style={styles.websiteButton}
                  onPress={() => Linking.openURL(placeDetails.website)}
                >
                  <Text style={styles.websiteButtonText}>Visit Website</Text>
                </TouchableOpacity>
              )}
            </View> */}

            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.modalDirectionsButton}
                onPress={() => {
                  setShowPlaceDetailsModal(false);
                  if (selectedPlace !== null) {
                    console.log("Selected place is: ", selectedPlace);
                    getDirections(
                      selectedPlace?.coordinates.latitude,
                      selectedPlace?.coordinates.longitude
                    );
                  }
                }}
              >
                <Navigation
                  size={18}
                  color="#fff"
                />
                <Text style={styles.modalDirectionsText}>Get Directions</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  map: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backButtonContainer: {
    position: "absolute",
    top: 35,
    left: 20,
    zIndex: 10,
  },
  backButton: {
    height: 50,
    width: 50,
    backgroundColor: "#fff",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  searchContainer: {
    position: "absolute",
    height: 100,
    top: 20,
    left: 80,
    right: 20,
    zIndex: 10,
  },
  searchingText: {
    marginLeft: 5,
    fontSize: 12,
    color: "#333",
  },
  selectedPlaceContainer: {
    position: "absolute",
    top: 80,
    left: 20,
    right: 20,
    zIndex: 8,
  },
  selectedPlaceCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  placeInfoContainer: {
    flex: 1,
  },
  placeButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  placeActionButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#007BFF",
    marginRight: 8,
  },
  placeActionButtonText: {
    color: "#007BFF",
    marginLeft: 5,
    fontSize: 12,
    fontWeight: "600",
  },
  selectedPlaceName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  selectedPlaceDescription: {
    fontSize: 12,
    color: "#666",
    marginTop: 5,
  },
  searchMarkerContainer: {
    backgroundColor: "rgba(255, 87, 34, 0.3)",
  },
  searchMarkerDot: {
    backgroundColor: "#FF5722",
  },
  markerListContainer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    paddingHorizontal: 10,
  },
  activeMarkerButton: {
    backgroundColor: "#E7E3AC",
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 5,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: 250,
  },
  markerButton: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 5,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: 250,
  },
  markerImage: {
    width: 55,
    height: 55,
    borderRadius: 10,
    marginRight: 10,
  },
  markerInfo: {
    flex: 1,
  },
  markerName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  markerDescription: {
    fontSize: 12,
    color: "#666",
    marginTop: 5,
  },
  directionsButton: {
    backgroundColor: "#007BFF",
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start",
  },
  directionsButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
    marginLeft: 5,
  },
  markerContainer: {
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: "rgba(0, 123, 255, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  markerDot: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: "#007BFF",
  },
  calloutBubble: {
    backgroundColor: "white",
    borderRadius: 6,
    padding: 5,
    width: 100,
    position: "absolute",
    bottom: 35,
    left: -35,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  calloutText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 12,
  },
  directionsLoadingContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -75 }, { translateY: -25 }],
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 150,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  directionsLoadingText: {
    marginLeft: 10,
    fontSize: 12,
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 20,
    maxHeight: "70%",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    flex: 1,
  },
  closeButton: {
    padding: 5,
  },
  modalBody: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  detailRow: {
    marginVertical: 5,
  },
  detailLabel: {
    fontWeight: "600",
    fontSize: 14,
    color: "#333",
  },
  detailText: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  websiteButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  websiteButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  bookmarkButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#007BFF",
    marginTop: 10,
  },
  bookmarkButtonText: {
    color: "#007BFF",
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "600",
  },
  modalFooter: {
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 15,
    paddingHorizontal: 20,
  },
  modalDirectionsButton: {
    backgroundColor: "#007BFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 10,
  },
  modalDirectionsText: {
    color: "#fff",
    fontWeight: "600",
    marginLeft: 8,
  },
  // Photo styles
  photosList: {
    marginBottom: 10,
  },
  placePhoto: {
    width: 150,
    height: 100,
    borderRadius: 8,
    marginRight: 10,
  },
  noPhotosContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  noPhotosText: {
    fontSize: 14,
    color: "#666",
  },
});

export default GoogleMapsComponent;
