import { LOCALES } from "./locales";

export const messages = {
    [LOCALES.ENGLISH]: {
        start_today: "Today is: {date}",
        about_project: "About the project",
        contact_us: "Contact us",
        language_switcher_label: "Language",
        city_search_placeholder: "Search City...",
        current_weather_search_city_not_found: "Sorry, city not found",
        current_weather_search_temp: "Temperature {value}",
        current_weather_search_weather: "Weather: {value}",
    },
    [LOCALES.ITALIAN]: {
        start_today: "Oggi e' il {date}",
        about_project: "Informazioni",
        contact_us: "Contatti",
        language_switcher_label: "Lingua",
        city_search_placeholder: "Ricerca Citta'...",
        current_weather_search_city_not_found: "Spiacenti, citta' non trovata",
        current_weather_search_temp: "Temperatura {value}",
        current_weather_search_weather: "Previsione: {value}",
    }
}