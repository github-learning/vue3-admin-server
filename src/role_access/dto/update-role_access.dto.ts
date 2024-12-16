import { PartialType } from '@nestjs/swagger';
import { AllocRoleAccessDto } from './create-role_access.dto';

export class UpdateRoleAccessDto extends PartialType(AllocRoleAccessDto) {}
