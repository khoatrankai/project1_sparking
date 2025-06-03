import {
  Injectable,
} from '@nestjs/common';
import { User } from 'src/database/entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Repository,
} from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Activity } from 'src/database/entities/activities.entity';
import { Apartment } from 'src/database/entities/apartments.entity';
import { ApartmentMember } from 'src/database/entities/apartment_members.entity';
import { ApartmentVehicle } from 'src/database/entities/apartment_vehicles.entity';
import { Chat } from 'src/database/entities/chats.entity';
import { Comments } from 'src/database/entities/comments.entity';
import { Guest } from 'src/database/entities/guests.entity';
import { Management } from 'src/database/entities/managements.entity';
import { Member } from 'src/database/entities/members.entity';
import { Note } from 'src/database/entities/notes.entity';
import { Notify } from 'src/database/entities/notifies.entity';
import { Reports } from 'src/database/entities/reports.entity';
import { Review } from 'src/database/entities/reviews.entity';
import { Vehicle } from 'src/database/entities/vehicles.entity';
import { Visitor } from 'src/database/entities/visitor.entity';

@Injectable()
export class ContractService {
  constructor(
    @InjectRepository(Activity)
    private activityRepository: Repository<Activity>,

    @InjectRepository(Apartment)
    private apartmentRepository: Repository<Apartment>,

    @InjectRepository(ApartmentMember)
    private apartmentMemberRepository: Repository<ApartmentMember>,

    @InjectRepository(ApartmentVehicle)
    private apartmentVehicleRepository: Repository<ApartmentVehicle>,

    @InjectRepository(Chat)
    private chatRepository: Repository<Chat>,

    @InjectRepository(Comments)
    private commentsRepository: Repository<Comments>,

    @InjectRepository(Guest)
    private guestRepository: Repository<Guest>,

    @InjectRepository(Management)
    private managementRepository: Repository<Management>,

    @InjectRepository(Member)
    private memberRepository: Repository<Member>,

    @InjectRepository(Note)
    private noteRepository: Repository<Note>,

    @InjectRepository(Notify)
    private notifyRepository: Repository<Notify>,

    @InjectRepository(Reports)
    private reportsRepository: Repository<Reports>,

    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,

    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Vehicle)
    private vehicleRepository: Repository<Vehicle>,

    @InjectRepository(Visitor)
    private visitorRepository: Repository<Visitor>,
    private readonly configService: ConfigService,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }
}