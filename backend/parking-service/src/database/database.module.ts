import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AggregatedCounter } from './entities/aggregatedcounter.entity';
import { AuthGroup } from './entities/auth_group.entity';
import { AuthGroupPermissions } from './entities/auth_group_permission.entity';
import { AuthPermission } from './entities/auth_permission.entity';
import { AuthUser } from './entities/auth_user.entity';
import { BlacklistPlate } from './entities/blacklistplate.entity';
import { LockCard } from './entities/lockcard.entity';
import { ParkingApartment } from './entities/parking_apartment.entity';
import { ParkingAttendance } from './entities/parking_attendance.entity';
import { ParkingBaselineAvailableSlot } from './entities/parking_baseline_available_slot.entity';
import { ParkingBaselineTransactionIn } from './entities/parking_baseline_transaction_in.entity';
import { ParkingBaselineTransactionOut } from './entities/parking_baseline_transaction_out.entity';
import { ParkingBlockFee } from './entities/parking_blockfee.entity';
import { ParkingBuilding } from './entities/parking_building.entity';
import { ParkingCamera } from './entities/parking_camera.entity';
import { ParkingCard } from './entities/parking_card.entity';
import { ParkingCardAuditLogEntry } from './entities/parking_cardauditlogentry.entity';
import { ParkingCardStatus } from './entities/parking_cardstatus.entity';
import { ParkingCardType } from './entities/parking_cardtype.entity';
import { ParkingCheckinImage } from './entities/parking_checkinimage.entity';
import { ParkingCheckoutException } from './entities/parking_checkoutexception.entity';
import { ParkingCheckoutExceptionInfo } from './entities/parking_checkoutexceptioninfo.entity';
import { ParkingClaimPromotion } from './entities/parking_claimpromotion.entity';
import { ParkingClaimPromotionBill } from './entities/parking_claimpromotionbill.entity';
import { ParkingClaimPromotionBillV2 } from './entities/parking_claimpromotionbillv2.entity';
import { ParkingClaimPromotionCoupon } from './entities/parking_claimpromotioncoupon.entity';
import { ParkingClaimPromotionCouponV2 } from './entities/parking_claimpromotioncouponv2.entity';
import { ParkingClaimPromotionGroupTenant } from './entities/parking_claimpromotiongrouptenant.entity';
import { ParkingClaimPromotionLogError } from './entities/parking_claimpromotion_logerror.entity';
import { ParkingClaimPromotionTenant } from './entities/parking_claimpromotiontenant.entity';
import { ParkingClaimPromotionV2 } from './entities/parking_claimpromotionv2.entity';
import { ParkingClaimPromotionVoucher } from './entities/parking_claimpromotionvoucher.entity';
import { ParkingCompany } from './entities/parking_company.entity';
import { ParkingCurrentBlacklistState } from './entities/parking_currentbalckliststate.entity';
import { ParkingCustomer } from './entities/parking_customer.entity';
import { ParkingCustomerType } from './entities/parking_customertype.entity';
import { ParkingDepositActionFee } from './entities/parking_depositactionfee.entity';
import { ParkingDepositPayment } from './entities/parking_depositpayment.entity';
import { ParkingDepositPaymentDetail } from './entities/parking_depositpaymentdetail.entity';
import { ParkingFeeAdjustment } from './entities/parking_feeadjustment.entity';
import { ParkingForcedBarrier } from './entities/parking_forcedbarier.entity';
import { ParkingImageReplicationSetting } from './entities/parking_imagereplicationsetting.entity';
import { ParkingLane } from './entities/parking_lane.entity';
import { ParkingLevelFee } from './entities/parking_levelfee.entity';
import { ParkingFee } from './entities/parking_parkingfee.entity';
import { ParkingFeeSession } from './entities/parking_parkingfeesession.entity';
import { ParkingSession } from './entities/parking_parkingsession.entity';
import { ParkingSetting } from './entities/parking_parkingsetting.entity';
import { PauseResumeHistory } from './entities/parking_pauseresumehistory.entity';
import { ParkingReceipt } from './entities/parking_receipt.entity';
import { ParkingReportData } from './entities/parking_reportdata.entity';
import { ParkingServer } from './entities/parking_server.entity';
import { ParkingSlot } from './entities/parking_slot.entity';
import { ParkingTerminal } from './entities/parking_terminal.entity';
import { ParkingTerminalGroup } from './entities/parking_terminalgroup.entity';
import { ParkingTicketPayment } from './entities/parking_ticketpayment.entity';
import { ParkingUserProfile } from './entities/parking_userprofile.entity';
import { ParkingUserShift } from './entities/parking_usershift.entity';
import { ParkingVehicleBlacklist } from './entities/parking_vehiclebalcklist.entity';
import { ParkingVehicleRegistration } from './entities/parking_vehicleregistration.entity';
import { ParkingVehicleRegistrationAuditLogEntry } from './entities/parking_vehicleregistrationauditlogentry.entity';
import { ParkingVehicleType } from './entities/parking_vehicletype.entity';
import { ParkingVoucher } from './entities/parking_voucher.entity';
import { UnlockCard } from './entities/unlockcard.entity';
import { ParkingTurnFee } from './entities/parking_turnfee.entity';
import { ParkingUserCard } from './entities/parking_usercard.entity';
import { ParkingTicketPaymentDetail } from './entities/parking_ticketpaymentdetail.entity';
import { ParkingCustomerAuditLogEntry } from './entities/parking_customerauditlogentry.entity';
import { AuthUserGroup } from './entities/auth_user_groups.entity';
import { AuthUserUserPermission } from './entities/auth_user_user_permissions.entity';
import { Counter } from './entities/counter.entity';
import { DjangoAdminLog } from './entities/django_admin_log.entity';
import { DjangoContentType } from './entities/django_content_type.entity';
import { GateNotified } from './entities/gatenotified.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456789',
      database: 'apmsdb',
      entities: [AggregatedCounter,AuthGroup,AuthGroupPermissions,AuthPermission,AuthUser,BlacklistPlate,LockCard,ParkingApartment,ParkingAttendance,ParkingBaselineAvailableSlot,ParkingBaselineTransactionIn,ParkingBaselineTransactionOut,ParkingBlockFee,ParkingBuilding,ParkingCamera,ParkingCard,ParkingCardAuditLogEntry,ParkingCardStatus,ParkingCardType,ParkingCheckinImage,ParkingCheckoutException,ParkingCheckoutExceptionInfo,ParkingClaimPromotion,ParkingClaimPromotionBill,ParkingClaimPromotionBillV2,ParkingClaimPromotionCoupon,ParkingClaimPromotionCouponV2,ParkingClaimPromotionGroupTenant,ParkingClaimPromotionLogError,ParkingClaimPromotionTenant,ParkingClaimPromotionV2,ParkingClaimPromotionVoucher,ParkingCompany,ParkingCurrentBlacklistState,ParkingCustomer,ParkingCustomerType,ParkingDepositActionFee,ParkingDepositPayment,ParkingDepositPaymentDetail,ParkingFeeAdjustment,ParkingForcedBarrier,ParkingImageReplicationSetting,ParkingLane,ParkingLevelFee,ParkingFee,ParkingFeeSession,ParkingSession,ParkingSetting,PauseResumeHistory,ParkingReceipt,ParkingReportData,ParkingServer,ParkingSlot,ParkingTerminal,ParkingTerminalGroup,ParkingTicketPayment,ParkingUserProfile,ParkingUserShift,ParkingVehicleBlacklist,ParkingVehicleRegistration,ParkingVehicleRegistrationAuditLogEntry,ParkingVehicleType,ParkingVoucher,UnlockCard,ParkingTurnFee,ParkingUserCard,ParkingTicketPaymentDetail,ParkingCustomerAuditLogEntry,AuthUserGroup,AuthUserUserPermission,Counter,DjangoAdminLog,DjangoContentType,GateNotified],
      // synchronize: true,
      // dropSchema: true,
    }),
  ],
})
export class DatabaseModule {}
