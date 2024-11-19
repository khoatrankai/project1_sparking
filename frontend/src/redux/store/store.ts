import { configureStore } from '@reduxjs/toolkit';
import typeProductReducer from '@/redux/store/slices/productSlices/get_type.slice'
import unitProductSlice from './slices/productSlices/get_unit.slice';
import vatSystemSlice from './slices/systemSlices/get_vat.slice';
import infoProductSlice from './slices/productSlices/get_products';
import aboutProductSlice from './slices/productSlices/get_about.slice';
import customerInfoSlice from './slices/customerSlices/get_all_customer.slice';
import customerAboutSlice from './slices/customerSlices/about_customer.slice';
import provinceSystemSlice from './slices/systemSlices/get_province.slice';
import typeOpportunitySlice from './slices/opportunitySlices/get_type.slice';
import sourcesOpportunitySlice from './slices/opportunitySlices/get_source.slice';
import userInfoSlice from './slices/userSlices/get_users.slice';
import opportunitySlice from './slices/opportunitySlices/get_opportunities.slice';
import projectsSlice from './slices/projectSlices/get_all_project.slice';
import priceQuoteSlice from './slices/priceQuoteSlices/get_price_quotes.slice';

export const store = configureStore({
  reducer: {
    type_product:typeProductReducer,
    unit_product:unitProductSlice,
    vat_system:vatSystemSlice,
    info_products:infoProductSlice,
    about_product:aboutProductSlice,
    infos_customer:customerInfoSlice,
    about_customer:customerAboutSlice,
    province_system:provinceSystemSlice,
    type_opportunity:typeOpportunitySlice,
    source_opportunity:sourcesOpportunitySlice,
    get_users:userInfoSlice,
    get_opportunities:opportunitySlice,
    get_projects:projectsSlice,
    get_price_quotes:priceQuoteSlice
  },
});

// Tạo các type cho RootState và AppDispatch để sử dụng TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;