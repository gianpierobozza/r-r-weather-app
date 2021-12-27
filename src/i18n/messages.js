import { LOCALES } from "./locales";

export const messages = {
    [LOCALES.ENGLISH]: {
        title_start_today: "Today is {date}",
        about_project: "About the project",
        contact_us: "Contact us",
        language_switcher_label: "Language",
        city_search_placeholder: "Search by City...",
        current_weather_search_city_not_found: "Sorry, city not found",
        current_weather_search_server_error: "Sorry, the server returned error: {value}",
        current_weather_search_weather: "Weather: {value}",
        seven_days_forecasts_accordion_title: "7 days forecasts",
    },
    [LOCALES.ITALIAN]: {
        title_start_today: "Oggi e' il {date}",
        about_project: "Informazioni",
        contact_us: "Contatti",
        language_switcher_label: "Lingua",
        city_search_placeholder: "Ricerca per Citta'...",
        current_weather_search_city_not_found: "Spiacenti, citta' non trovata",
        current_weather_search_weather: "Previsione: {value}",
        seven_days_forecasts_accordion_title: "Previsioni a 7 giorni",
    }
}