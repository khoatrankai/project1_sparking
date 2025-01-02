import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemController } from './system.controller';
import { SystemService } from './system.service';
import { AggregatedCounter } from 'src/database/entities/aggregatedcounter.entity';
import { AuthGroup } from 'src/database/entities/auth_group.entity';
import { AuthGroupPermissions } from 'src/database/entities/auth_group_permission.entity';
import { AuthPermission } from 'src/database/entities/auth_permission.entity';
import { AuthUser } from 'src/database/entities/auth_user.entity';
import { BlacklistPlate } from 'src/database/entities/blacklistplate.entity';
import { LockCard } from 'src/database/entities/lockcard.entity';
import { ParkingApartment } from 'src/database/entities/parking_apartment.entity';
import { ParkingAttendance } from 'src/database/entities/parking_attendance.entity';
import { ParkingBaselineAvailableSlot } from 'src/database/entities/parking_baseline_available_slot.entity';
import { ParkingBaselineTransactionIn } from 'src/database/entities/parking_baseline_transaction_in.entity';
import { ParkingBaselineTransactionOut } from 'src/database/entities/parking_baseline_transaction_out.entity';
import { ParkingBlockFee } from 'src/database/entities/parking_blockfee.entity';
import { ParkingBuilding } from 'src/database/entities/parking_building.entity';
import { ParkingCamera } from 'src/database/entities/parking_camera.entity';
import { ParkingCard } from 'src/database/entities/parking_card.entity';
import { ParkingCardAuditLogEntry } from 'src/database/entities/parking_cardauditlogentry.entity';
import { ParkingCardStatus } from 'src/database/entities/parking_cardstatus.entity';
import { ParkingCardType } from 'src/database/entities/parking_cardtype.entity';
import { ParkingCheckinImage } from 'src/database/entities/parking_checkinimage.entity';
import { ParkingCheckoutException } from 'src/database/entities/parking_checkoutexception.entity';
import { ParkingCheckoutExceptionInfo } from 'src/database/entities/parking_checkoutexceptioninfo.entity';
import { ParkingClaimPromotion } from 'src/database/entities/parking_claimpromotion.entity';
import { ParkingClaimPromotionLogError } from 'src/database/entities/parking_claimpromotion_logerror.entity';
import { ParkingClaimPromotionBill } from 'src/database/entities/parking_claimpromotionbill.entity';
import { ParkingClaimPromotionBillV2 } from 'src/database/entities/parking_claimpromotionbillv2.entity';
import { ParkingClaimPromotionCoupon } from 'src/database/entities/parking_claimpromotioncoupon.entity';
import { ParkingClaimPromotionCouponV2 } from 'src/database/entities/parking_claimpromotioncouponv2.entity';
import { ParkingClaimPromotionGroupTenant } from 'src/database/entities/parking_claimpromotiongrouptenant.entity';
import { ParkingClaimPromotionTenant } from 'src/database/entities/parking_claimpromotiontenant.entity';
import { ParkingClaimPromotionV2 } from 'src/database/entities/parking_claimpromotionv2.entity';
import { ParkingClaimPromotionVoucher } from 'src/database/entities/parking_claimpromotionvoucher.entity';
import { ParkingCompany } from 'src/database/entities/parking_company.entity';
import { ParkingCurrentBlacklistState } from 'src/database/entities/parking_currentbalckliststate.entity';
import { ParkingCustomer } from 'src/database/entities/parking_customer.entity';
import { ParkingCustomerType } from 'src/database/entities/parking_customertype.entity';
import { ParkingDepositActionFee } from 'src/database/entities/parking_depositactionfee.entity';
import { ParkingDepositPayment } from 'src/database/entities/parking_depositpayment.entity';
import { ParkingDepositPaymentDetail } from 'src/database/entities/parking_depositpaymentdetail.entity';
import { ParkingFeeAdjustment } from 'src/database/entities/parking_feeadjustment.entity';
import { ParkingForcedBarrier } from 'src/database/entities/parking_forcedbarier.entity';
import { ParkingImageReplicationSetting } from 'src/database/entities/parking_imagereplicationsetting.entity';
import { ParkingLane } from 'src/database/entities/parking_lane.entity';
import { ParkingLevelFee } from 'src/database/entities/parking_levelfee.entity';
import { ParkingFee } from 'src/database/entities/parking_parkingfee.entity';
import { ParkingFeeSession } from 'src/database/entities/parking_parkingfeesession.entity';
import { ParkingSession } from 'src/database/entities/parking_parkingsession.entity';
import { ParkingSetting } from 'src/database/entities/parking_parkingsetting.entity';
import { PauseResumeHistory } from 'src/database/entities/parking_pauseresumehistory.entity';
import { ParkingReceipt } from 'src/database/entities/parking_receipt.entity';
import { ParkingReportData } from 'src/database/entities/parking_reportdata.entity';
import { ParkingServer } from 'src/database/entities/parking_server.entity';
import { ParkingSlot } from 'src/database/entities/parking_slot.entity';
import { ParkingTerminal } from 'src/database/entities/parking_terminal.entity';
import { ParkingTerminalGroup } from 'src/database/entities/parking_terminalgroup.entity';
import { ParkingTicketPayment } from 'src/database/entities/parking_ticketpayment.entity';
import { ParkingUserProfile } from 'src/database/entities/parking_userprofile.entity';
import { ParkingUserShift } from 'src/database/entities/parking_usershift.entity';
import { ParkingVehicleBlacklist } from 'src/database/entities/parking_vehiclebalcklist.entity';
import { ParkingVehicleRegistration } from 'src/database/entities/parking_vehicleregistration.entity';
import { ParkingVehicleRegistrationAuditLogEntry } from 'src/database/entities/parking_vehicleregistrationauditlogentry.entity';
import { ParkingVehicleType } from 'src/database/entities/parking_vehicletype.entity';
import { ParkingVoucher } from 'src/database/entities/parking_voucher.entity';
import { UnlockCard } from 'src/database/entities/unlockcard.entity';
import { ParkingTurnFee } from 'src/database/entities/parking_turnfee.entity';
import { ParkingUserCard } from 'src/database/entities/parking_usercard.entity';
import { ParkingTicketPaymentDetail } from 'src/database/entities/parking_ticketpaymentdetail.entity';
import { ParkingCustomerAuditLogEntry } from 'src/database/entities/parking_customerauditlogentry.entity';
import { AuthUserGroup } from 'src/database/entities/auth_user_groups.entity';
import { AuthUserUserPermission } from 'src/database/entities/auth_user_user_permissions.entity';
import { Counter } from 'src/database/entities/counter.entity';
import { DjangoAdminLog } from 'src/database/entities/django_admin_log.entity';
import { DjangoContentType } from 'src/database/entities/django_content_type.entity';
import { GateNotified } from 'src/database/entities/gatenotified.entity';


@Module({
  imports: [TypeOrmModule.forFeature([AggregatedCounter,AuthGroup,AuthGroupPermissions,AuthPermission,AuthUser,BlacklistPlate,LockCard,ParkingApartment,ParkingAttendance,ParkingBaselineAvailableSlot,ParkingBaselineTransactionIn,ParkingBaselineTransactionOut,ParkingBlockFee,ParkingBuilding,ParkingCamera,ParkingCard,ParkingCardAuditLogEntry,ParkingCardStatus,ParkingCardType,ParkingCheckinImage,ParkingCheckoutException,ParkingCheckoutExceptionInfo,ParkingClaimPromotion,ParkingClaimPromotionBill,ParkingClaimPromotionBillV2,ParkingClaimPromotionCoupon,ParkingClaimPromotionCouponV2,ParkingClaimPromotionGroupTenant,ParkingClaimPromotionLogError,ParkingClaimPromotionTenant,ParkingClaimPromotionV2,ParkingClaimPromotionVoucher,ParkingCompany,ParkingCurrentBlacklistState,ParkingCustomer,ParkingCustomerType,ParkingDepositActionFee,ParkingDepositPayment,ParkingDepositPaymentDetail,ParkingFeeAdjustment,ParkingForcedBarrier,ParkingImageReplicationSetting,ParkingLane,ParkingLevelFee,ParkingFee,ParkingFeeSession,ParkingSession,ParkingSetting,PauseResumeHistory,ParkingReceipt,ParkingReportData,ParkingServer,ParkingSlot,ParkingTerminal,ParkingTerminalGroup,ParkingTicketPayment,ParkingUserProfile,ParkingUserShift,ParkingVehicleBlacklist,ParkingVehicleRegistration,ParkingVehicleRegistrationAuditLogEntry,ParkingVehicleType,ParkingVoucher,UnlockCard,ParkingTurnFee,ParkingUserCard,ParkingTicketPaymentDetail,ParkingCustomerAuditLogEntry,AuthUserGroup,AuthUserUserPermission,Counter,DjangoAdminLog,DjangoContentType,GateNotified])],
  controllers: [SystemController],
  providers: [SystemService],
  // exports:[TypeOrmModule]
})
export class SystemModule {}
