
import { HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { ResultResponse } from 'src/common/interfaces/result.interface';
import { AccountUsers } from 'src/database/entities/account_users.entity';
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
import { GetFrequencyDto } from 'src/dto/GetFrequency.dto';
import { In, Repository } from 'typeorm';
import { UpdateAccountUserDto } from 'src/dto/AccountUser/update.dto';
import { CreateParkingApartmentDto } from 'src/dto/Apartment/create.dto';
import { UpdateParkingApartmentDto } from 'src/dto/Apartment/update.dto';
import { CreateAccountUserDto } from 'src/dto/AccountUser/create.dto';
import { Notify } from 'src/database/entities/notify.entity';
import { CreateNotifyDto } from 'src/dto/Notify/create.dto';
import { AccountAdmin } from 'src/database/entities/account_admin.entity';
import { UpdateNotifyDto } from 'src/dto/Notify/update.dto';
import { Member } from 'src/database/entities/members.entity';
import { Activity } from 'src/database/entities/activities.entity';
import { Review } from 'src/database/entities/reviews.entity';
import { Note } from 'src/database/entities/notes.entity';
import { Guest } from 'src/database/entities/guests.entity';
import { ChatUser } from 'src/database/entities/chat.entity';
@Injectable()
export class SystemService {
  constructor(
    @InjectRepository(AggregatedCounter)
    private readonly aggregatedCounterRepository: Repository<AggregatedCounter>,
    @InjectRepository(AuthGroup)
    private readonly authGroupRepository: Repository<AuthGroup>,
    @InjectRepository(AuthGroupPermissions)
    private readonly authGroupPermissionsRepository: Repository<AuthGroupPermissions>,
    @InjectRepository(AuthPermission)
    private readonly authPermissionRepository: Repository<AuthPermission>,
    @InjectRepository(AuthUser)
    private readonly authUserRepository: Repository<AuthUser>,
    @InjectRepository(BlacklistPlate)
    private readonly blacklistPlateRepository: Repository<BlacklistPlate>,
    @InjectRepository(LockCard)
    private readonly lockCardRepository: Repository<LockCard>,
    @InjectRepository(ParkingApartment)
    private readonly parkingApartmentRepository: Repository<ParkingApartment>,
    @InjectRepository(ParkingAttendance)
    private readonly parkingAttendanceRepository: Repository<ParkingAttendance>,
    @InjectRepository(ParkingBaselineAvailableSlot)
    private readonly parkingBaselineAvailableSlotRepository: Repository<ParkingBaselineAvailableSlot>,
    @InjectRepository(ParkingBaselineTransactionIn)
    private readonly parkingBaselineTransactionInRepository: Repository<ParkingBaselineTransactionIn>,
    @InjectRepository(ParkingBaselineTransactionOut)
    private readonly parkingBaselineTransactionOutRepository: Repository<ParkingBaselineTransactionOut>,
    @InjectRepository(ParkingBlockFee)
    private readonly parkingBlockFeeRepository: Repository<ParkingBlockFee>,
    @InjectRepository(ParkingBuilding)
    private readonly parkingBuildingRepository: Repository<ParkingBuilding>,
    @InjectRepository(ParkingCamera)
    private readonly parkingCameraRepository: Repository<ParkingCamera>,
    @InjectRepository(ParkingCard)
    private readonly parkingCardRepository: Repository<ParkingCard>,
    @InjectRepository(ParkingCardAuditLogEntry)
    private readonly parkingCardAuditLogEntryRepository: Repository<ParkingCardAuditLogEntry>,
    @InjectRepository(ParkingCardStatus)
    private readonly parkingCardStatusRepository: Repository<ParkingCardStatus>,
    @InjectRepository(ParkingCardType)
    private readonly parkingCardTypeRepository: Repository<ParkingCardType>,
    @InjectRepository(ParkingCheckinImage)
    private readonly parkingCheckinImageRepository: Repository<ParkingCheckinImage>,
    @InjectRepository(ParkingCheckoutException)
    private readonly parkingCheckoutExceptionRepository: Repository<ParkingCheckoutException>,
    @InjectRepository(ParkingCheckoutExceptionInfo)
    private readonly parkingCheckoutExceptionInfoRepository: Repository<ParkingCheckoutExceptionInfo>,
    @InjectRepository(ParkingClaimPromotion)
    private readonly parkingClaimPromotionRepository: Repository<ParkingClaimPromotion>,
    @InjectRepository(ParkingClaimPromotionBill)
    private readonly parkingClaimPromotionBillRepository: Repository<ParkingClaimPromotionBill>,
    @InjectRepository(ParkingClaimPromotionBillV2)
    private readonly parkingClaimPromotionBillV2Repository: Repository<ParkingClaimPromotionBillV2>,
    @InjectRepository(ParkingClaimPromotionCoupon)
    private readonly parkingClaimPromotionCouponRepository: Repository<ParkingClaimPromotionCoupon>,
    @InjectRepository(ParkingClaimPromotionCouponV2)
    private readonly parkingClaimPromotionCouponV2Repository: Repository<ParkingClaimPromotionCouponV2>,
    @InjectRepository(ParkingClaimPromotionGroupTenant)
    private readonly parkingClaimPromotionGroupTenantRepository: Repository<ParkingClaimPromotionGroupTenant>,
    @InjectRepository(ParkingClaimPromotionLogError)
    private readonly parkingClaimPromotionLogErrorRepository: Repository<ParkingClaimPromotionLogError>,
    @InjectRepository(ParkingClaimPromotionTenant)
    private readonly parkingClaimPromotionTenantRepository: Repository<ParkingClaimPromotionTenant>,
    @InjectRepository(ParkingClaimPromotionV2)
    private readonly parkingClaimPromotionV2Repository: Repository<ParkingClaimPromotionV2>,
    @InjectRepository(ParkingClaimPromotionVoucher)
    private readonly parkingClaimPromotionVoucherRepository: Repository<ParkingClaimPromotionVoucher>,
    @InjectRepository(ParkingCompany)
    private readonly parkingCompanyRepository: Repository<ParkingCompany>,
    @InjectRepository(ParkingCurrentBlacklistState)
    private readonly parkingCurrentBlacklistStateRepository: Repository<ParkingCurrentBlacklistState>,
    @InjectRepository(ParkingCustomer)
    private readonly parkingCustomerRepository: Repository<ParkingCustomer>,
    @InjectRepository(ParkingCustomerType)
    private readonly parkingCustomerTypeRepository: Repository<ParkingCustomerType>,
    @InjectRepository(ParkingDepositActionFee)
    private readonly parkingDepositActionFeeRepository: Repository<ParkingDepositActionFee>,
    @InjectRepository(ParkingDepositPayment)
    private readonly parkingDepositPaymentRepository: Repository<ParkingDepositPayment>,
    @InjectRepository(ParkingDepositPaymentDetail)
    private readonly parkingDepositPaymentDetailRepository: Repository<ParkingDepositPaymentDetail>,
    @InjectRepository(ParkingFeeAdjustment)
    private readonly parkingFeeAdjustmentRepository: Repository<ParkingFeeAdjustment>,
    @InjectRepository(ParkingForcedBarrier)
    private readonly parkingForcedBarrierRepository: Repository<ParkingForcedBarrier>,
    @InjectRepository(ParkingImageReplicationSetting)
    private readonly parkingImageReplicationSettingRepository: Repository<ParkingImageReplicationSetting>,
    @InjectRepository(ParkingLane)
    private readonly parkingLaneRepository: Repository<ParkingLane>,
    @InjectRepository(ParkingLevelFee)
    private readonly parkingLevelFeeRepository: Repository<ParkingLevelFee>,
    @InjectRepository(ParkingFee)
    private readonly parkingFeeRepository: Repository<ParkingFee>,
    @InjectRepository(ParkingFeeSession)
    private readonly parkingFeeSessionRepository: Repository<ParkingFeeSession>,
    @InjectRepository(ParkingSession)
    private readonly parkingSessionRepository: Repository<ParkingSession>,
    @InjectRepository(ParkingSetting)
    private readonly parkingSettingRepository: Repository<ParkingSetting>,
    @InjectRepository(PauseResumeHistory)
    private readonly pauseResumeHistoryRepository: Repository<PauseResumeHistory>,
    @InjectRepository(ParkingReceipt)
    private readonly parkingReceiptRepository: Repository<ParkingReceipt>,
    @InjectRepository(ParkingReportData)
    private readonly parkingReportDataRepository: Repository<ParkingReportData>,
    @InjectRepository(ParkingServer)
    private readonly parkingServerRepository: Repository<ParkingServer>,
    @InjectRepository(ParkingSlot)
    private readonly parkingSlotRepository: Repository<ParkingSlot>,
    @InjectRepository(ParkingTerminal)
    private readonly parkingTerminalRepository: Repository<ParkingTerminal>,
    @InjectRepository(ParkingTerminalGroup)
    private readonly parkingTerminalGroupRepository: Repository<ParkingTerminalGroup>,
    @InjectRepository(ParkingTicketPayment)
    private readonly parkingTicketPaymentRepository: Repository<ParkingTicketPayment>,
    @InjectRepository(ParkingUserProfile)
    private readonly parkingUserProfileRepository: Repository<ParkingUserProfile>,
     @InjectRepository(AccountUsers)
    private readonly accountUserRepository: Repository<AccountUsers>,
    @InjectRepository(ParkingUserShift)
    private readonly parkingUserShiftRepository: Repository<ParkingUserShift>,
    @InjectRepository(ParkingVehicleBlacklist)
    private readonly parkingVehicleBlacklistRepository: Repository<ParkingVehicleBlacklist>,
    @InjectRepository(ParkingVehicleRegistration)
    private readonly parkingVehicleRegistrationRepository: Repository<ParkingVehicleRegistration>,
    @InjectRepository(ParkingVehicleRegistrationAuditLogEntry)
    private readonly parkingVehicleRegistrationAuditLogEntryRepository: Repository<ParkingVehicleRegistrationAuditLogEntry>,
    @InjectRepository(ParkingVehicleType)
    private readonly parkingVehicleTypeRepository: Repository<ParkingVehicleType>,
    @InjectRepository(ParkingVoucher)
    private readonly parkingVoucherRepository: Repository<ParkingVoucher>,
    @InjectRepository(UnlockCard)
    private readonly unlockCardRepository: Repository<UnlockCard>,
    @InjectRepository(ParkingTurnFee)
    private readonly parkingTurnFeeRepository: Repository<ParkingTurnFee>,
    @InjectRepository(ParkingUserCard)
    private readonly parkingUserCardRepository: Repository<ParkingUserCard>,
    @InjectRepository(ParkingTicketPaymentDetail)
    private readonly parkingTicketPaymentDetailRepository: Repository<ParkingTicketPaymentDetail>,
     @InjectRepository(Notify)
    private readonly notifyRepository: Repository<Notify>,
    @InjectRepository(AccountAdmin)
    private readonly accountAdminRepository: Repository<AccountAdmin>,
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
    @InjectRepository(Activity)
    private readonly activityRepository: Repository<Activity>,
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    @InjectRepository(Note)
    private readonly noteRepository: Repository<Note>,
    @InjectRepository(Guest)
    private readonly guestRepository: Repository<Guest>,
    @InjectRepository(ChatUser)
    private readonly chatUserRepository: Repository<ChatUser>,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }
  async findParkingFeesession() {
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
    const data = await this.parkingFeeSessionRepository
      .createQueryBuilder('parkingFeeSession')
      .leftJoinAndSelect('parkingFeeSession.parkingSession', 'parkingSession')
      .leftJoinAndSelect('parkingSession.parkingCard', 'parkingCard')
      .leftJoinAndSelect('parkingSession.checkInOperator', 'checkInOperator')
      .leftJoinAndSelect('parkingSession.checkOutOperator', 'checkOutOperator')
      .leftJoinAndSelect(
        'parkingSession.checkOutException',
        'checkOutException',
      )
      .leftJoinAndSelect('parkingFeeSession.vehicleType', 'vehicleType')
      .where('parkingCard.card_type = :cardType', { cardType: 0 }) // Điều kiện lọc card_type = 0
      .select([
        'parkingFeeSession.id',
        'parkingFeeSession.payment_date',
        'parkingFeeSession.vehicle_number',
        'parkingSession.card_id',
        'parkingSession.check_in_time',
        'parkingSession.check_out_time',
        'checkOutException.parking_fee',
        'parkingCard.card_label',
        'parkingCard.card_type',
        'checkInOperator.username',
        'checkOutOperator.username',
        'vehicleType.name',
        'vehicleType.code',
      ])
      .limit(100)
      .getMany();
    return data;
  }

  async getDashboardTotal() {
    // const total0Revenue = (await this.parkingFeeSessionRepository.find({where:{session_type:"OUT",is_vehicle_registration:false,parking_fee: Not(0)},select:{
    //   parking_fee:true
    // }})).reduce((preValue,currValue)=>{
    //  return preValue+currValue.parking_fee
    // },0)
    const data = await this.parkingFeeSessionRepository
      .createQueryBuilder('session')
      // .where('session.is_vehicle_registration = :vehicleType AND session.session_type = :sessionType', { vehicleType: false,sessionType:"OUT" })
      .select(['session.is_vehicle_registration', 'session.session_type'])
      .addSelect('SUM(session.parking_fee)', 'total_parking_fee')
      .addSelect('COUNT(*)', 'count')
      .groupBy('session.is_vehicle_registration')
      .addGroupBy('session.session_type')
      .getRawMany();

    return data;
  }

  async customerCategory() {
    const data = await this.parkingCustomerRepository.find({
      relations: ['parkingVehicleRegistrations'],
      select: {
        id: true,
        customerName: true,
        parkingVehicleRegistrations: {
          vehicle_driver_name: true,
          // id:true
        },
      },
    });
    return data;
  }

  async getFrequency(data: GetFrequencyDto) {
    const getStartAndEndOfWeek = (date: Date) => {
      const currentDay = date.getDay(); // 0: Chủ Nhật, 1: Thứ Hai, ..., 6: Thứ Bảy
      const distanceToMonday = currentDay === 0 ? -6 : 1 - currentDay; // Khoảng cách đến thứ Hai
      const distanceToSunday = currentDay === 0 ? 0 : 7 - currentDay; // Khoảng cách đến Chủ Nhật
      const startOfWeek = new Date(date);
      startOfWeek.setDate(date.getDate() + distanceToMonday);
      startOfWeek.setHours(0, 0, 0, 0);
      const endOfWeek = new Date(date);
      endOfWeek.setDate(date.getDate() + distanceToSunday);
      endOfWeek.setHours(23, 59, 59, 999);
      return { startOfWeek, endOfWeek };
    };

    //   const data = await this.parkingFeeSessionRepository
    // .createQueryBuilder('parkingFeeSession')
    // .leftJoinAndSelect('parkingFeeSession.vehicleType', 'vehicleType')
    // .where('parkingFeeSession.session_type = :sessionType', { sessionType: "OUT" }).limit(100)
    // .select('vehicleType.name','name')
    // .addSelect('vehicleType.id','id')
    // .addSelect('COUNT(*)','count')
    // .groupBy('vehicleType.id')
    // .getRawMany();

    if (data.type === 'day') {
      const today = new Date();
      const startOfDay = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        0,
        0,
        0,
      );
      const endOfDay = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        23,
        59,
        59,
      );
      const dataToday = await this.parkingFeeSessionRepository
        .createQueryBuilder('feesession')
        .leftJoinAndSelect('feesession.vehicleType', 'vehicleType')
        .select([
          'HOUR(feesession.timestamp) AS hour',
          'vehicleType.name AS vehicleTypeName',
          'COUNT(feesession.id) AS count', // Đếm số lượng bản ghi theo loại xe
        ])
        .where(
          'feesession.session_type = :sessionType AND feesession.timestamp BETWEEN :startOfDay AND :endOfDay',
          {
            startOfDay,
            endOfDay,
            sessionType: data.status,
          },
        )
        .groupBy('HOUR(feesession.timestamp), vehicleType.id')
        .orderBy('hour', 'ASC')
        .getRawMany();
      const groupedData = dataToday.reduce((acc, row) => {
        const hourGroup = acc.find((group) => group.hour === row.hour);
        if (hourGroup) {
          hourGroup.data.push({
            name: row.vehicleTypeName,
            count: parseInt(row.count, 10),
          });
        } else {
          acc.push({
            hour: row.hour,
            data: [
              {
                name: row.vehicleTypeName,
                count: parseInt(row.count, 10),
              },
            ],
          });
        }

        return acc;
      }, []);
      return groupedData;
    }

    if (data.type === 'week') {
      const { startOfWeek, endOfWeek } = getStartAndEndOfWeek(new Date());
      const dataByWeekday = await this.parkingFeeSessionRepository
        .createQueryBuilder('feesession')
        .leftJoinAndSelect('feesession.vehicleType', 'vehicleType')
        .select([
          'DAYOFWEEK(feesession.timestamp) AS weekday', // Lấy số ngày trong tuần
          'DAYNAME(feesession.timestamp) AS dayName', // Lấy tên ngày
          'vehicleType.name AS vehicleTypeName', // Lấy tên loại xe
          'COUNT(feesession.id) AS count', // Đếm số lượng
        ])
        .where(
          'feesession.session_type = :sessionType AND feesession.timestamp BETWEEN :startOfWeek AND :endOfWeek',
          {
            startOfWeek,
            endOfWeek,
            sessionType: data.status,
          },
        )
        .groupBy('DAYOFWEEK(feesession.timestamp), vehicleType.name')
        .getRawMany();

      const groupedByWeekday = dataByWeekday.reduce((acc, row) => {
        const weekdayGroup = acc.find((group) => group.weekday === row.weekday);

        if (weekdayGroup) {
          weekdayGroup.data.push({
            name: row.vehicleTypeName,
            count: parseInt(row.count, 10),
          });
        } else {
          acc.push({
            weekday: row.weekday,
            dayName: row.dayName,
            data: [
              {
                name: row.vehicleTypeName,
                count: parseInt(row.count, 10),
              },
            ],
          });
        }

        return acc;
      }, []);
      return groupedByWeekday;
    }

    if (data.type === 'month') {
      const today = new Date();
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      const dataByDay = await this.parkingFeeSessionRepository
        .createQueryBuilder('feesession')
        .leftJoinAndSelect('feesession.vehicleType', 'vehicleType')
        .select([
          "DATE_FORMAT(feesession.timestamp, '%d-%m-%Y') AS date",
          'vehicleType.name AS vehicleTypeName', // Lấy tên loại xe
          'COUNT(feesession.id) AS count', // Đếm số lượng
        ])
        .where(
          'feesession.session_type = :sessionType AND feesession.timestamp BETWEEN :startOfMonth AND :endOfMonth',
          {
            startOfMonth, // Truyền đúng biến
            endOfMonth, // Truyền đúng biến
            sessionType: data.status,
          },
        )
        .groupBy(
          "DATE_FORMAT(feesession.timestamp, '%d-%m-%Y'), vehicleType.name",
        )
        .getRawMany();
      const groupedByDay = dataByDay.reduce((acc, row) => {
        const weekdayGroup = acc.find((group) => group.date === row.date);

        if (weekdayGroup) {
          weekdayGroup.data.push({
            name: row.vehicleTypeName,
            count: parseInt(row.count, 10),
          });
        } else {
          acc.push({
            date: row.date,
            data: [
              {
                name: row.vehicleTypeName,
                count: parseInt(row.count, 10),
              },
            ],
          });
        }

        return acc;
      }, []);
      return groupedByDay;
    }

    if (data.type === 'year') {
      const today = new Date();
      const currentYear = today.getFullYear();
      const startOfYear = new Date(currentYear, 0, 1, 0, 0, 0);
      const endOfYear = new Date(currentYear, 11, 31, 23, 59, 59);
      const dataByMonth = await this.parkingFeeSessionRepository
        .createQueryBuilder('feesession')
        .leftJoinAndSelect('feesession.vehicleType', 'vehicleType')
        .select([
          'MONTH(feesession.timestamp) AS month',
          'vehicleType.name AS vehicleTypeName',
          'COUNT(feesession.id) AS count',
        ])
        .where(
          'feesession.session_type = :sessionType AND feesession.timestamp BETWEEN :startOfYear AND :endOfYear',
          {
            startOfYear,
            endOfYear,
            sessionType: data.status,
          },
        )
        .groupBy('MONTH(feesession.timestamp), vehicleType.name')
        .getRawMany();
      const groupedByMonth = dataByMonth.reduce((acc, row) => {
        const weekdayGroup = acc.find((group) => group.month === row.month);

        if (weekdayGroup) {
          weekdayGroup.data.push({
            name: row.vehicleTypeName,
            count: parseInt(row.count, 10),
          });
        } else {
          acc.push({
            month: row.month,
            data: [
              {
                name: row.vehicleTypeName,
                count: parseInt(row.count, 10),
              },
            ],
          });
        }

        return acc;
      }, []);
      return groupedByMonth;
    }

    if (data.type === 'all') {
      const dataByMonth = await this.parkingFeeSessionRepository
        .createQueryBuilder('feesession')
        .leftJoinAndSelect('feesession.vehicleType', 'vehicleType')
        .select([
          "DATE_FORMAT(feesession.timestamp, '%m-%Y') AS date",
          'vehicleType.name AS vehicleTypeName',
          'COUNT(feesession.id) AS count',
        ])
        .where('feesession.session_type = :sessionType', {
          sessionType: data.status,
        })
        .groupBy("DATE_FORMAT(feesession.timestamp, '%m-%Y'), vehicleType.name")
        .getRawMany();
      const groupedByMonth = dataByMonth.reduce((acc, row) => {
        const weekdayGroup = acc.find((group) => group.date === row.date);

        if (weekdayGroup) {
          weekdayGroup.data.push({
            name: row.vehicleTypeName,
            count: parseInt(row.count, 10),
          });
        } else {
          acc.push({
            date: row.date,
            data: [
              {
                name: row.vehicleTypeName,
                count: parseInt(row.count, 10),
              },
            ],
          });
        }

        return acc;
      }, []);
      return groupedByMonth;
    }
  }

  async getRevenue(data: GetFrequencyDto) {
    const getStartAndEndOfWeek = (date: Date) => {
      const currentDay = date.getDay(); // 0: Chủ Nhật, 1: Thứ Hai, ..., 6: Thứ Bảy
      const distanceToMonday = currentDay === 0 ? -6 : 1 - currentDay; // Khoảng cách đến thứ Hai
      const distanceToSunday = currentDay === 0 ? 0 : 7 - currentDay; // Khoảng cách đến Chủ Nhật
      const startOfWeek = new Date(date);
      startOfWeek.setDate(date.getDate() + distanceToMonday);
      startOfWeek.setHours(0, 0, 0, 0);
      const endOfWeek = new Date(date);
      endOfWeek.setDate(date.getDate() + distanceToSunday);
      endOfWeek.setHours(23, 59, 59, 999);
      return { startOfWeek, endOfWeek };
    };

    if (data.type === 'day') {
      const today = new Date();
      const startOfDay = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        0,
        0,
        0,
      );
      const endOfDay = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        23,
        59,
        59,
      );
      const dataToday = await this.parkingFeeSessionRepository
        .createQueryBuilder('feesession')
        .leftJoinAndSelect('feesession.vehicleType', 'vehicleType')
        .select([
          'HOUR(feesession.timestamp) AS hour',
          'vehicleType.name AS vehicleTypeName',
          'SUM(feesession.parking_fee) AS total', // Đếm số lượng bản ghi theo loại xe
        ])
        .where(
          'feesession.session_type = :sessionType AND feesession.timestamp BETWEEN :startOfDay AND :endOfDay',
          {
            startOfDay,
            endOfDay,
            sessionType: data.status,
          },
        )
        .groupBy('HOUR(feesession.timestamp), vehicleType.id')
        .orderBy('hour', 'ASC')
        .getRawMany();
      const groupedData = dataToday.reduce((acc, row) => {
        const hourGroup = acc.find((group) => group.hour === row.hour);
        if (hourGroup) {
          hourGroup.data.push({
            name: row.vehicleTypeName,
            total: parseInt(row.total, 10),
          });
        } else {
          acc.push({
            hour: row.hour,
            data: [
              {
                name: row.vehicleTypeName,
                total: parseInt(row.total, 10),
              },
            ],
          });
        }

        return acc;
      }, []);
      return groupedData;
    }

    if (data.type === 'week') {
      const { startOfWeek, endOfWeek } = getStartAndEndOfWeek(new Date());
      const dataByWeekday = await this.parkingFeeSessionRepository
        .createQueryBuilder('feesession')
        .leftJoinAndSelect('feesession.vehicleType', 'vehicleType')
        .select([
          'DAYOFWEEK(feesession.timestamp) AS weekday', // Lấy số ngày trong tuần
          'DAYNAME(feesession.timestamp) AS dayName', // Lấy tên ngày
          'vehicleType.name AS vehicleTypeName', // Lấy tên loại xe
          'SUM(feesession.parking_fee) AS total', // Đếm số lượng
        ])
        .where(
          'feesession.session_type = :sessionType AND feesession.timestamp BETWEEN :startOfWeek AND :endOfWeek',
          {
            startOfWeek,
            endOfWeek,
            sessionType: data.status,
          },
        )
        .groupBy('DAYOFWEEK(feesession.timestamp), vehicleType.name')
        .getRawMany();

      const groupedByWeekday = dataByWeekday.reduce((acc, row) => {
        const weekdayGroup = acc.find((group) => group.weekday === row.weekday);

        if (weekdayGroup) {
          weekdayGroup.data.push({
            name: row.vehicleTypeName,
            total: parseInt(row.total, 10),
          });
        } else {
          acc.push({
            weekday: row.weekday,
            dayName: row.dayName,
            data: [
              {
                name: row.vehicleTypeName,
                total: parseInt(row.total, 10),
              },
            ],
          });
        }

        return acc;
      }, []);
      return groupedByWeekday;
    }

    if (data.type === 'month') {
      const today = new Date();
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      const dataByDay = await this.parkingFeeSessionRepository
        .createQueryBuilder('feesession')
        .leftJoinAndSelect('feesession.vehicleType', 'vehicleType')
        .select([
          "DATE_FORMAT(feesession.timestamp, '%d-%m-%Y') AS date",
          'vehicleType.name AS vehicleTypeName', // Lấy tên loại xe
          'SUM(feesession.parking_fee) AS total', // Đếm số lượng
        ])
        .where(
          'feesession.session_type = :sessionType AND feesession.timestamp BETWEEN :startOfMonth AND :endOfMonth',
          {
            startOfMonth, // Truyền đúng biến
            endOfMonth, // Truyền đúng biến
            sessionType: data.status,
          },
        )
        .groupBy(
          "DATE_FORMAT(feesession.timestamp, '%d-%m-%Y'), vehicleType.name",
        )
        .getRawMany();
      const groupedByDay = dataByDay.reduce((acc, row) => {
        const weekdayGroup = acc.find((group) => group.date === row.date);

        if (weekdayGroup) {
          weekdayGroup.data.push({
            name: row.vehicleTypeName,
            total: parseInt(row.total, 10),
          });
        } else {
          acc.push({
            date: row.date,
            data: [
              {
                name: row.vehicleTypeName,
                total: parseInt(row.total, 10),
              },
            ],
          });
        }

        return acc;
      }, []);
      return groupedByDay;
    }

    if (data.type === 'year') {
      const today = new Date();
      const currentYear = today.getFullYear();
      const startOfYear = new Date(currentYear, 0, 1, 0, 0, 0);
      const endOfYear = new Date(currentYear, 11, 31, 23, 59, 59);
      const dataByMonth = await this.parkingFeeSessionRepository
        .createQueryBuilder('feesession')
        .leftJoinAndSelect('feesession.vehicleType', 'vehicleType')
        .select([
          'MONTH(feesession.timestamp) AS month',
          'vehicleType.name AS vehicleTypeName',
          'SUM(feesession.parking_fee) AS total',
        ])
        .where(
          'feesession.session_type = :sessionType AND feesession.timestamp BETWEEN :startOfYear AND :endOfYear',
          {
            startOfYear,
            endOfYear,
            sessionType: data.status,
          },
        )
        .groupBy('MONTH(feesession.timestamp), vehicleType.name')
        .getRawMany();
      const groupedByMonth = dataByMonth.reduce((acc, row) => {
        const weekdayGroup = acc.find((group) => group.month === row.month);

        if (weekdayGroup) {
          weekdayGroup.data.push({
            name: row.vehicleTypeName,
            total: parseInt(row.total, 10),
          });
        } else {
          acc.push({
            month: row.month,
            data: [
              {
                name: row.vehicleTypeName,
                total: parseInt(row.total, 10),
              },
            ],
          });
        }

        return acc;
      }, []);
      return groupedByMonth;
    }

    if (data.type === 'all') {
      const dataByMonth = await this.parkingFeeSessionRepository
        .createQueryBuilder('feesession')
        .leftJoinAndSelect('feesession.vehicleType', 'vehicleType')
        .select([
          "DATE_FORMAT(feesession.timestamp, '%m-%Y') AS date",
          'vehicleType.name AS vehicleTypeName',
          'SUM(feesession.parking_fee) AS total',
        ])
        .where('feesession.session_type = :sessionType', {
          sessionType: data.status,
        })
        .groupBy("DATE_FORMAT(feesession.timestamp, '%m-%Y'), vehicleType.name")
        .getRawMany();
      const groupedByMonth = dataByMonth.reduce((acc, row) => {
        const weekdayGroup = acc.find((group) => group.date === row.date);

        if (weekdayGroup) {
          weekdayGroup.data.push({
            name: row.vehicleTypeName,
            total: parseInt(row.total, 10),
          });
        } else {
          acc.push({
            date: row.date,
            data: [
              {
                name: row.vehicleTypeName,
                total: parseInt(row.total, 10),
              },
            ],
          });
        }

        return acc;
      }, []);
      return groupedByMonth;
    }
  }

  async getTypeReport(startDate: number, endDate: number) {
    const startOfDate = new Date(startDate);
    const endOfDate = new Date(endDate);
    const dataDate = await this.parkingFeeSessionRepository
      .createQueryBuilder('feesession')
      .leftJoinAndSelect('feesession.vehicleType', 'vehicleType')
      .select([
        'vehicleType.name AS vehicleTypeName',
        'is_vehicle_registration AS typeRegistration',
        "SUM(CASE WHEN feesession.session_type = 'IN' THEN 1 ELSE 0 END) AS inCount",
        "SUM(CASE WHEN feesession.session_type = 'OUT' THEN 1 ELSE 0 END) AS outCount",
        'SUM(feesession.parking_fee) AS total',
      ])
      .where('feesession.timestamp BETWEEN :startOfDate AND :endOfDate', {
        startOfDate,
        endOfDate,
      })
      .groupBy('vehicleType.id, feesession.is_vehicle_registration')
      .getRawMany();

    return dataDate;
  }
async hashPassword(password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(
      password,
      10
    );
    return hashedPassword;
  }
  async createUser(registerDto: CreateAccountUserDto): Promise<ResultResponse> {
    try {
      const checkUser = await this.accountUserRepository.findOneBy({
        email: registerDto.email,
      });
      if (checkUser) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Tài khoản đã tồn tại',
        };
      }
      const id = uuidv4();
      const pass = await this.hashPassword(registerDto.password);
      const user = this.accountUserRepository.create({
        ...registerDto,
        id: id,
        password: pass
      });
      await this.accountUserRepository.save(user);
     
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Tạo tài khoản thành công',
      };
    } catch (err) {
      //console.log(err);
      // if (err.code === 'ER_DUP_ENTRY') {
      //   const errField = this.extractDuplicateField(err.sqlMessage);
      //   throw new ConflictException(`${errField} đã tồn tại.`);
      // }

      throw new InternalServerErrorException('Không thể tạo người dùng mới');
    }
  }

  async deleteUser(datas: string[]) {
    try {
      const rm = await this.accountUserRepository.delete({
        id: In(datas),
      });
      if (rm) {
        return {
          statusCode: HttpStatus.OK,
          message: 'Đã xóa thành công',
        };
      }
    } catch {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Xóa thất bại',
      };
    }
  }

  async updateUser(
    id: string,
    updateDto: UpdateAccountUserDto,
  ): Promise<ResultResponse> {
    try {
      if (updateDto.password) {
        const pass = await this.hashPassword(updateDto.password);
        await this.accountUserRepository.update(id, {
          ...updateDto,
          password: pass,
        });
      } else {
        await this.accountUserRepository.update(id, { ...updateDto });
      }
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Cập nhật tài khoản thành công',
      };
    } catch (err) {
      //console.log(err);
      

      throw new InternalServerErrorException('Không thể tạo người dùng mới');
    }
  }
  async createApartment(data: CreateParkingApartmentDto): Promise<ResultResponse> {
    try {
      
      await this.parkingApartmentRepository.save({...data});
     
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Tạo căn hộ thành công',
      };
    } catch (err) {
      //console.log(err);
      // if (err.code === 'ER_DUP_ENTRY') {
      //   const errField = this.extractDuplicateField(err.sqlMessage);
      //   throw new ConflictException(`${errField} đã tồn tại.`);
      // }

      throw new InternalServerErrorException('Không thể tạo người dùng mới');
    }
  }

  async deleteApartment(datas: string[]) {
    try {
      const rm = await this.parkingApartmentRepository.delete({
        id: In(datas),
      });
      if (rm) {
        return {
          statusCode: HttpStatus.OK,
          message: 'Đã xóa thành công',
        };
      }
    } catch {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Xóa thất bại',
      };
    }
  }

  async updateApartment(
    id: string,
    updateDto: UpdateParkingApartmentDto,
  ): Promise<ResultResponse> {
    try {
      
        await this.parkingApartmentRepository.update(id, { ...updateDto });
      
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Cập nhật tài khoản thành công',
      };
    } catch (err) {
      //console.log(err);
      

      throw new InternalServerErrorException('Không thể tạo người dùng mới');
    }
  }

  async getApartmentByID(id:number){
    try{
      const data = await this.parkingApartmentRepository.findOne({where:{id:id},relations:['customers']})
      return {
        statusCode:HttpStatus.OK,
        data:data
      }
    }catch{
      return {
        statusCode:HttpStatus.BAD_REQUEST
      }
    }
  }

  async getApartments(){
    try{
      const datas = await this.parkingApartmentRepository.find()
      return {
        statusCode:HttpStatus.OK,
        data:datas
      }
    }catch{
      return {
        statusCode:HttpStatus.BAD_REQUEST
      }
    }
  }

  async getAccountUser(id:string){
    try{
      const data= await this.accountUserRepository.findOne({where:{id}})
      return {
        statusCode:HttpStatus.OK,
        data
      }
    }catch{
      return {
              statusCode:HttpStatus.BAD_REQUEST,
              message:"Lỗi rồi"
            }
    }
  }

  async createNotify(dataCreate: CreateNotifyDto): Promise<ResultResponse> {
    try {
      const admin = dataCreate.admin ? await this.accountAdminRepository.findOne({where:{id:dataCreate.admin}}) : undefined
      const account = dataCreate.account ? await this.accountUserRepository.findOne({where:{id:dataCreate.account}}) : undefined
      const data = this.notifyRepository.create({...dataCreate,admin,account})
      await this.notifyRepository.save({...data});
     
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Tạo thông báo thành công',
      };
    } catch (err) {
      //console.log(err);
      // if (err.code === 'ER_DUP_ENTRY') {
      //   const errField = this.extractDuplicateField(err.sqlMessage);
      //   throw new ConflictException(`${errField} đã tồn tại.`);
      // }

      throw new InternalServerErrorException('Không thể tạo người dùng mới');
    }
  }

  async deleteNotify(datas: string[]) {
    try {
      const rm = await this.notifyRepository.delete({
        id: In(datas),
      });
      if (rm) {
        return {
          statusCode: HttpStatus.OK,
          message: 'Đã xóa thành công',
        };
      }
    } catch {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Xóa thất bại',
      };
    }
  }

  async updateNotify(
    id: string,
    updateDto: UpdateNotifyDto,
  ): Promise<ResultResponse> {
    try {
      const admin = updateDto.admin ? await this.accountAdminRepository.findOne({where:{id:updateDto.admin}}) : undefined
      const account = updateDto.account ? await this.accountUserRepository.findOne({where:{id:updateDto.account}}) : undefined
        await this.notifyRepository.update(id, { ...updateDto,admin,account });
      
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Cập nhật thông báo thành công',
      };
    } catch (err) {
      //console.log(err);
      

      throw new InternalServerErrorException('Không thể tạo người dùng mới');
    }
  }

  async getNotifyByIDUser(id:string){
    try{
      const datas = await this.notifyRepository.find({where:{account:In([id])},relations:['admin']})
      return {
        statusCode:HttpStatus.OK,
        data:datas
      }
    }catch{
      return {
        statusCode:HttpStatus.BAD_REQUEST
      }
    }
  }

  async getUsersByApartment(id:number){
    try{
      const datas = await this.accountUserRepository.createQueryBuilder('account_user')
      .leftJoin('account_user.account_apartment','account_apartment')
      .leftJoin('account_apartment.apartment','apartment')
      .where('apartment.id =:id',{id})
      .getMany()
      return{
        statusCode:HttpStatus.OK,
        data:datas
      }
    }catch{
      return{
        statusCode:HttpStatus.BAD_REQUEST,
        message:"Lỗi rồi"
      }
    }
  }

  async getMembersByApartment(id:number){
    try{
      const datas = await this.memberRepository.createQueryBuilder('members')
      .leftJoin('members.list_apartment','list_apartment')
      .leftJoin('list_apartment.apartment','apartment')
      .where('apartment.id =:id',{id})
      .getMany()
      return{
        statusCode:HttpStatus.OK,
        data:datas
      }
    }catch{
      return{
        statusCode:HttpStatus.BAD_REQUEST,
        message:"Lỗi rồi"
      }
    }
  }

  async getActivitiesByApartment(id:number){
    try{
      const datas = await this.activityRepository.createQueryBuilder('activities')
      .leftJoin('activities.apartment','apartment')
      .where('apartment.id =:id',{id})
      .getMany()
      return{
        statusCode:HttpStatus.OK,
        data:datas
      }
    }catch{
      return{
        statusCode:HttpStatus.BAD_REQUEST,
        message:"Lỗi rồi"
      }
    }
  }

  async getReviewsByApartment(id:number){
    try{
      const datas = await this.activityRepository.createQueryBuilder('reviews')
      .leftJoin('reviews.apartment','apartment')
      .where('apartment.id =:id',{id})
      .getMany()
      return{
        statusCode:HttpStatus.OK,
        data:datas
      }
    }catch{
      return{
        statusCode:HttpStatus.BAD_REQUEST,
        message:"Lỗi rồi"
      }
    }
  }

  async getNotesByUser(id:string){
    try{
      const datas = await this.noteRepository.createQueryBuilder('notes')
      .leftJoin('notes.user','user')
      .where('user.id =:id',{id})
      .getMany()
      return{
        statusCode:HttpStatus.OK,
        data:datas
      }
    }catch{
      return{
        statusCode:HttpStatus.BAD_REQUEST,
        message:"Lỗi rồi"
      }
    }
  }

  async getGuestByApartment(id:number){
    try{
      const datas = await this.guestRepository.createQueryBuilder('guests')
      .leftJoin('guests.apartment','apartment')
      .where('apartment.id =:id',{id})
      .getMany()
      return{
        statusCode:HttpStatus.OK,
        data:datas
      }
    }catch{
      return{
        statusCode:HttpStatus.BAD_REQUEST,
        message:"Lỗi rồi"
      }
    }
  }

  async getChatByID(id:string){
    try{
      const datas = await this.chatUserRepository.find({where:[{user1:In([id])},{user2:In([id])}]})
      return{
        statusCode:HttpStatus.OK,
        data:datas
      }
    }catch{
      return{
        statusCode:HttpStatus.BAD_REQUEST,
        message:"Lỗi rồi"
      }
    }
  }

  async getUsersChatByID(id:string){
    try{
      const datas = await this.accountUserRepository.createQueryBuilder('users')
      .leftJoin('users.chats_from','chats_from')
      .leftJoin('users.chats_to','chats_to')
      .where('chats_from.user1 =:id OR chats_from.user2 =:id OR chats_to.user2 =:id OR chats_to.user1 =:id',{id})
      .getMany()
      return{
        statusCode:HttpStatus.OK,
        data:datas
      }
    }catch{
      return{
        statusCode:HttpStatus.BAD_REQUEST,
        message:"Lỗi rồi"
      }
    }
  }
}
