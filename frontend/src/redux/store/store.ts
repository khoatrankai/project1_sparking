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
import typeMethodSlice from './slices/contractSlices/type_method.slice';
import typeContractSlice from './slices/contractSlices/type_contract.slide';
import contractSlice from './slices/contractSlices/contract.slide';
import paymentSlice from './slices/contractSlices/payment.slide';
import activitySlice from './slices/activitySlices/activity.slice';
import workSlice from './slices/activitySlices/work.slide';
import typeActivitySlice from './slices/activitySlices/type_activity.slice';
import typeWorkSlice from './slices/activitySlices/type_work.slice';
import customerGroupSlice from './slices/customerSlices/get_all_group.slice';
import statusActivitySlice from './slices/activitySlices/status_activity.slice';
import statusWorkSlice from './slices/activitySlices/status_work.slice';
import supplierSlice from './slices/productSlices/get_supplier.slice';
import activityContainerSlice from './slices/productSlices/get_activity_container.slice';
import profitSystemSlice from './slices/systemSlices/get_profit.slice';
import brandProductSlice from './slices/productSlices/get_brand.slice';
import originalProductSlice from './slices/productSlices/get_original.slice';
import statusMenu from './slices/menu.slice'
import userProfileSlice from './slices/userSlices/get_profile.slice';
import typeProjectSlice from './slices/projectSlices/get_type.slice';


export const store = configureStore({
  reducer: {
    type_product:typeProductReducer,
    unit_product:unitProductSlice,
    brand_product:brandProductSlice,
    original_product:originalProductSlice,
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
    type_projects:typeProjectSlice,
    get_price_quotes:priceQuoteSlice,
    get_type_method:typeMethodSlice,
    get_type_contract:typeContractSlice,
    get_contracts:contractSlice,
    get_payments:paymentSlice,
    get_activities:activitySlice,
    get_works:workSlice,
    get_type_activities:typeActivitySlice,
    get_type_work:typeWorkSlice,
    get_group_customer:customerGroupSlice,
    get_status_activity:statusActivitySlice,
    get_status_work:statusWorkSlice,
    get_supplier:supplierSlice,
    get_activity_container:activityContainerSlice,
    get_profits:profitSystemSlice,
    status_tab_menu:statusMenu,
    get_profile:userProfileSlice
  },
});

// Tạo các type cho RootState và AppDispatch để sử dụng TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;