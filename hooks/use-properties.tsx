"use client"

import { Property } from "@/types/property.types";
import {
    useCopilotAction,
    useCopilotReadable,
} from "@copilotkit/react-core";
import {
    createContext,
    useContext,
    useState,
    ReactNode,
    useEffect,
} from "react";

type PropertyContextType = {
    properties: Property[] | undefined;
    propOnMap: Property | undefined;
};

const PropertiesContext = createContext<PropertyContextType | undefined>(undefined);

export const PropertiesProvider = ({ children }: { children: ReactNode }) => {
    const [properties, setProperties] = useState<Property[] | undefined>(undefined);
    const [propOnMap, setPropOnMap] = useState<Property | undefined>(undefined);

    useEffect(() => {
        async function fetchProperties() {
            try {
                const response = await fetch('/api/property');
                console.log(JSON.stringify(response))
                if (!response.ok) {
                    throw new Error('Failed to fetch properties');
                }
                const data = await response.json();
                setProperties(data?.data);
            } catch (error) {
                console.error('Error fetching properties data:', error);
            }
        }

        fetchProperties();
    }, []);

    const findPlace = async (input: string) => {
        const response = await fetch(`api/google?input=${input}`);
        const data = await response.json();

        if (!data["data"]) {
            console.error('No place found!')
        }

        // For simplicity, pick the first candidate
        const candidate = data?.data?.result;

        const place = {
            ...(!!candidate?.name && { displayName: candidate.name }),
            ...(!!candidate?.formattedAddress && { formattedAddress: candidate.formattedAddress }),
            ...(!!candidate?.geometry?.location && { viewport: candidate.geometry.location }),
            ...(!!candidate?.geometry?.viewport && { viewport: candidate.geometry.viewport }),
            ...(!!candidate?.address_components && { addressComponents: candidate.address_components }),
            ...(!!candidate?.adr_address && { adrAddress: candidate.adr_address }),
            ...(!!candidate?.business_status && { businessStatus: candidate.business_status }),
            ...(!!candidate?.formatted_phone_number && { formattedPhoneNumber: candidate.formatted_phone_number }),
            ...(!!candidate?.icon && { icon: candidate.icon }),
            ...(!!candidate?.international_phone_number && { internationalPhoneNumber: candidate.international_phone_number }),
            ...(!!candidate?.opening_hours && { openingHours: candidate.opening_hours }),
            ...(!!candidate?.photos && { photos: candidate.photos }),
            ...(!!candidate?.place_id && { placeId: candidate.place_id }),
            ...(!!candidate?.plus_code && { plusCode: candidate.plus_code }),
            ...(!!candidate?.price_level && { priceLevel: candidate.price_level }),
            ...(!!candidate?.rating && { rating: candidate.rating }),
            ...(!!candidate?.reviews && { reviews: candidate.reviews }),
            ...(!!candidate?.types && { types: candidate.types }),
            ...(!!candidate?.url && { url: candidate.url }),
            ...(!!candidate?.utc_offset && { utcOffset: candidate.utc_offset }),
            ...(!!candidate?.vicinity && { vicinity: candidate.vicinity }),
            ...(!!candidate?.website && { website: candidate.website }),
        };

        return place
    }


    useCopilotReadable({
        description: "The state of the properties list",
        value: JSON.stringify(properties),
    });

    useCopilotAction({
        name: "showPropertyOnMap",
        description: "Show property on map whenever you suggest a new property to the user.",
        parameters: [
            {
                name: "Address",
                type: "string",
                description: "agency name",
                required: true,
            },
            {
                name: "Rent",
                type: "number",
                description: "for_sale or sold or other",
                required: true,
            },
            {
                name: "Beds",
                type: "number",
                description: "house price",
                required: true,
            },
            {
                name: "Baths",
                type: "number",
                description: "number of bedroom",
                required: true,
            },
            {
                name: "Type",
                type: "string",
                description: "number of bathroom",
                required: true,
            },
            {
                name: "Area_in_sqft",
                type: "number",
                description: "total land size in acres",
                required: true,
            },
            {
                name: "Rent_per_sqft",
                type: "number",
                description: "street address",
                required: true,
            },
            {
                name: "Rent_category",
                type: "string",
                description: "Rent category",
                required: true,
            },
            {
                name: "Frequency",
                type: "string",
                description: "Frequency",
                required: true,
            },
            {
                name: "Furnishing",
                type: "string",
                description: "Furnishing",
                required: true,
            },
            {
                name: "Purpose",
                type: "string",
                description: "living space in square feet",
                required: true,
            },
            {
                name: "Posted_date",
                type: "string",
                description: "previously sold date",
                required: true,
            },
            {
                name: "Age_of_listing_in_days",
                type: "number",
                description: "Age of listing in days",
                required: true,
            },
            {
                name: "Location",
                type: "string",
                description: "Location",
                required: true,
            },
            {
                name: "City",
                type: "string",
                description: "City",
                required: true,
            },
            {
                name: "Latitude",
                type: "number",
                description: "Latitude",
                required: true,
            },
            {
                name: "Longitude",
                type: "number",
                description: "Longitude",
                required: true,
            },
        ],
        handler: (arg) => {
            showPropertyOnMap(arg)
        }
    })

    const showPropertyOnMap = async (Property: Property) => {
        const place = await findPlace(Property.Address)
        if (place) setPropOnMap({ ...Property, placeData: place })
    }

    return (
        <PropertiesContext.Provider
            value={{
                properties,
                propOnMap
            }}
        >
            {children}
        </PropertiesContext.Provider>
    );
};

export const useProperties = () => {
    const context = useContext(PropertiesContext);
    if (context === undefined) {
        throw new Error("useProperties must be used within a PropertiesProvider");
    }
    return context;
};
