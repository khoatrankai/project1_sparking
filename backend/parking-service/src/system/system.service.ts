import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
import { ParkingTicketPaymentDetail } from 'src/database/entities/parking_ticketpaymentdetail.entity';
import { ParkingTurnFee } from 'src/database/entities/parking_turnfee.entity';
import { ParkingUserCard } from 'src/database/entities/parking_usercard.entity';
import { ParkingUserProfile } from 'src/database/entities/parking_userprofile.entity';
import { ParkingUserShift } from 'src/database/entities/parking_usershift.entity';
import { ParkingVehicleBlacklist } from 'src/database/entities/parking_vehiclebalcklist.entity';
import { ParkingVehicleRegistration } from 'src/database/entities/parking_vehicleregistration.entity';
import { ParkingVehicleRegistrationAuditLogEntry } from 'src/database/entities/parking_vehicleregistrationauditlogentry.entity';
import { ParkingVehicleType } from 'src/database/entities/parking_vehicletype.entity';
import { ParkingVoucher } from 'src/database/entities/parking_voucher.entity';
import { UnlockCard } from 'src/database/entities/unlockcard.entity';
import { Repository } from 'typeorm';
;



@Injectable()
export class SystemService {

  constructor(@InjectRepository(AggregatedCounter) private readonly aggregatedCounterRepository: Repository<AggregatedCounter>, 
  @InjectRepository(AuthGroup) private readonly authGroupRepository: Repository<AuthGroup>, 
  @InjectRepository(AuthGroupPermissions) private readonly authGroupPermissionsRepository: Repository<AuthGroupPermissions>, 
  @InjectRepository(AuthPermission) private readonly authPermissionRepository: Repository<AuthPermission>, 
  @InjectRepository(AuthUser) private readonly authUserRepository: Repository<AuthUser>, 
  @InjectRepository(BlacklistPlate) private readonly blacklistPlateRepository: Repository<BlacklistPlate>, 
  @InjectRepository(LockCard) private readonly lockCardRepository: Repository<LockCard>, 
  @InjectRepository(ParkingApartment) private readonly parkingApartmentRepository: Repository<ParkingApartment>, 
  @InjectRepository(ParkingAttendance) private readonly parkingAttendanceRepository: Repository<ParkingAttendance>, 
  @InjectRepository(ParkingBaselineAvailableSlot) private readonly parkingBaselineAvailableSlotRepository: Repository<ParkingBaselineAvailableSlot>, 
  @InjectRepository(ParkingBaselineTransactionIn) private readonly parkingBaselineTransactionInRepository: Repository<ParkingBaselineTransactionIn>, 
  @InjectRepository(ParkingBaselineTransactionOut) private readonly parkingBaselineTransactionOutRepository: Repository<ParkingBaselineTransactionOut>, 
  @InjectRepository(ParkingBlockFee) private readonly parkingBlockFeeRepository: Repository<ParkingBlockFee>, 
  @InjectRepository(ParkingBuilding) private readonly parkingBuildingRepository: Repository<ParkingBuilding>, 
  @InjectRepository(ParkingCamera) private readonly parkingCameraRepository: Repository<ParkingCamera>, 
  @InjectRepository(ParkingCard) private readonly parkingCardRepository: Repository<ParkingCard>, 
  @InjectRepository(ParkingCardAuditLogEntry) private readonly parkingCardAuditLogEntryRepository: Repository<ParkingCardAuditLogEntry>, 
  @InjectRepository(ParkingCardStatus) private readonly parkingCardStatusRepository: Repository<ParkingCardStatus>, 
  @InjectRepository(ParkingCardType) private readonly parkingCardTypeRepository: Repository<ParkingCardType>, 
  @InjectRepository(ParkingCheckinImage) private readonly parkingCheckinImageRepository: Repository<ParkingCheckinImage>, 
  @InjectRepository(ParkingCheckoutException) private readonly parkingCheckoutExceptionRepository: Repository<ParkingCheckoutException>, 
  @InjectRepository(ParkingCheckoutExceptionInfo) private readonly parkingCheckoutExceptionInfoRepository: Repository<ParkingCheckoutExceptionInfo>, 
  @InjectRepository(ParkingClaimPromotion) private readonly parkingClaimPromotionRepository: Repository<ParkingClaimPromotion>, 
  @InjectRepository(ParkingClaimPromotionBill) private readonly parkingClaimPromotionBillRepository: Repository<ParkingClaimPromotionBill>, 
  @InjectRepository(ParkingClaimPromotionBillV2) private readonly parkingClaimPromotionBillV2Repository: Repository<ParkingClaimPromotionBillV2>, 
  @InjectRepository(ParkingClaimPromotionCoupon) private readonly parkingClaimPromotionCouponRepository: Repository<ParkingClaimPromotionCoupon>, 
  @InjectRepository(ParkingClaimPromotionCouponV2) private readonly parkingClaimPromotionCouponV2Repository: Repository<ParkingClaimPromotionCouponV2>, 
  @InjectRepository(ParkingClaimPromotionGroupTenant) private readonly parkingClaimPromotionGroupTenantRepository: Repository<ParkingClaimPromotionGroupTenant>, 
  @InjectRepository(ParkingClaimPromotionLogError) private readonly parkingClaimPromotionLogErrorRepository: Repository<ParkingClaimPromotionLogError>, 
  @InjectRepository(ParkingClaimPromotionTenant) private readonly parkingClaimPromotionTenantRepository: Repository<ParkingClaimPromotionTenant>, 
  @InjectRepository(ParkingClaimPromotionV2) private readonly parkingClaimPromotionV2Repository: Repository<ParkingClaimPromotionV2>, 
  @InjectRepository(ParkingClaimPromotionVoucher) private readonly parkingClaimPromotionVoucherRepository: Repository<ParkingClaimPromotionVoucher>, 
  @InjectRepository(ParkingCompany) private readonly parkingCompanyRepository: Repository<ParkingCompany>, 
  @InjectRepository(ParkingCurrentBlacklistState) private readonly parkingCurrentBlacklistStateRepository: Repository<ParkingCurrentBlacklistState>, 
  @InjectRepository(ParkingCustomer) private readonly parkingCustomerRepository: Repository<ParkingCustomer>, 
  @InjectRepository(ParkingCustomerType) private readonly parkingCustomerTypeRepository: Repository<ParkingCustomerType>, 
  @InjectRepository(ParkingDepositActionFee) private readonly parkingDepositActionFeeRepository: Repository<ParkingDepositActionFee>, 
  @InjectRepository(ParkingDepositPayment) private readonly parkingDepositPaymentRepository: Repository<ParkingDepositPayment>, 
  @InjectRepository(ParkingDepositPaymentDetail) private readonly parkingDepositPaymentDetailRepository: Repository<ParkingDepositPaymentDetail>, 
  @InjectRepository(ParkingFeeAdjustment) private readonly parkingFeeAdjustmentRepository: Repository<ParkingFeeAdjustment>, 
  @InjectRepository(ParkingForcedBarrier) private readonly parkingForcedBarrierRepository: Repository<ParkingForcedBarrier>, 
  @InjectRepository(ParkingImageReplicationSetting) private readonly parkingImageReplicationSettingRepository: Repository<ParkingImageReplicationSetting>, 
  @InjectRepository(ParkingLane) private readonly parkingLaneRepository: Repository<ParkingLane>, 
  @InjectRepository(ParkingLevelFee) private readonly parkingLevelFeeRepository: Repository<ParkingLevelFee>, 
  @InjectRepository(ParkingFee) private readonly parkingFeeRepository: Repository<ParkingFee>, 
  @InjectRepository(ParkingFeeSession) private readonly parkingFeeSessionRepository: Repository<ParkingFeeSession>, 
  @InjectRepository(ParkingSession) private readonly parkingSessionRepository: Repository<ParkingSession>, 
  @InjectRepository(ParkingSetting) private readonly parkingSettingRepository: Repository<ParkingSetting>, 
  @InjectRepository(PauseResumeHistory) private readonly pauseResumeHistoryRepository: Repository<PauseResumeHistory>, 
  @InjectRepository(ParkingReceipt) private readonly parkingReceiptRepository: Repository<ParkingReceipt>, 
  @InjectRepository(ParkingReportData) private readonly parkingReportDataRepository: Repository<ParkingReportData>, 
  @InjectRepository(ParkingServer) private readonly parkingServerRepository: Repository<ParkingServer>, 
  @InjectRepository(ParkingSlot) private readonly parkingSlotRepository: Repository<ParkingSlot>, 
  @InjectRepository(ParkingTerminal) private readonly parkingTerminalRepository: Repository<ParkingTerminal>, 
  @InjectRepository(ParkingTerminalGroup) private readonly parkingTerminalGroupRepository: Repository<ParkingTerminalGroup>, 
  @InjectRepository(ParkingTicketPayment) private readonly parkingTicketPaymentRepository: Repository<ParkingTicketPayment>, 
  @InjectRepository(ParkingUserProfile) private readonly parkingUserProfileRepository: Repository<ParkingUserProfile>, 
  @InjectRepository(ParkingUserShift) private readonly parkingUserShiftRepository: Repository<ParkingUserShift>, 
  @InjectRepository(ParkingVehicleBlacklist) private readonly parkingVehicleBlacklistRepository: Repository<ParkingVehicleBlacklist>, 
  @InjectRepository(ParkingVehicleRegistration) private readonly parkingVehicleRegistrationRepository: Repository<ParkingVehicleRegistration>, 
  @InjectRepository(ParkingVehicleRegistrationAuditLogEntry) private readonly parkingVehicleRegistrationAuditLogEntryRepository: Repository<ParkingVehicleRegistrationAuditLogEntry>, 
  @InjectRepository(ParkingVehicleType) private readonly parkingVehicleTypeRepository: Repository<ParkingVehicleType>, 
  @InjectRepository(ParkingVoucher) private readonly parkingVoucherRepository: Repository<ParkingVoucher>, 
  @InjectRepository(UnlockCard) private readonly unlockCardRepository: Repository<UnlockCard>,
  @InjectRepository(ParkingTurnFee)
    private readonly parkingTurnFeeRepository: Repository<ParkingTurnFee>,
    @InjectRepository(ParkingUserCard)
    private readonly parkingUserCardRepository: Repository<ParkingUserCard>,
    @InjectRepository(ParkingTicketPaymentDetail)
    private readonly parkingTicketPaymentDetailRepository: Repository<ParkingTicketPaymentDetail>,
  ){}
  getHello(): string {
    return 'Hello World!';
  }
  async findParkingFeesession(){
  //   const data = await this.parkingFeeSessionRepository.findOne({where:{},relations:['parkingSession','vehicleType','parkingSession.parkingCard','parkingSession.checkInOperator','parkingSession.checkOutOperator','parkingSession.checkOutException'],select:{
  //   id: true,
  //   payment_date: true,
  //   vehicle_number:true,
  //   parkingSession: {
  //     card_id: true,
  //     check_in_time:true,
  //     check_out_time:true,
  //     checkOutException:{
  //       parking_fee:true
  //     },
  //     parkingCard: {
  //       card_label: true,
  //       card_type:true
  //     },
  //     checkInOperator: {
  //       username: true,
  //     },
  //     checkOutOperator: {
  //       username: true,
  //     },
  //   },
  //   vehicleType: {
  //     name: true,
  //     code: true,
  //   },
  // }
    
  //   })
  // const data = await this.parkingFeeSessionRepository
  // .createQueryBuilder('parkingFeeSession')
  // .leftJoinAndSelect('parkingFeeSession.parkingSession', 'parkingSession')
  // .leftJoinAndSelect('parkingSession.parkingCard', 'parkingCard')
  // .leftJoinAndSelect('parkingSession.checkInOperator', 'checkInOperator')
  // .leftJoinAndSelect('parkingSession.checkOutOperator', 'checkOutOperator')
  // .leftJoinAndSelect('parkingSession.checkOutException', 'checkOutException')
  // .leftJoinAndSelect('parkingFeeSession.vehicleType', 'vehicleType')
  // .where('parkingCard.card_type = :cardType', { cardType: 0 }) // Điều kiện lọc card_type = 0
  // .select([
  //   'parkingFeeSession.id',
  //   'parkingFeeSession.payment_date',
  //   'parkingFeeSession.vehicle_number',
  //   'parkingSession.card_id',
  //   'parkingSession.check_in_time',
  //   'parkingSession.check_out_time',
  //   'checkOutException.parking_fee',
  //   'parkingCard.card_label',
  //   'parkingCard.card_type',
  //   'checkInOperator.username',
  //   'checkOutOperator.username',
  //   'vehicleType.name',
  //   'vehicleType.code',
  // ]).limit(100)
  // .getMany();
  const data = await this.parkingCustomerRepository.find({relations:['parkingVehicleRegistrations'],select:{
    id:true,
    customerName:true,
    parkingVehicleRegistrations:{
      vehicle_driver_name:true,
      // id:true
    }

  }})
    return data
  }
 
}
