import { PartialType } from '@nestjs/swagger';
import { CreateRoleAccessDto } from './create-role_access.dto';

export class UpdateRoleAccessDto extends PartialType(CreateRoleAccessDto) {}
