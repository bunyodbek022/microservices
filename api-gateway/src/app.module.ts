import { Module } from '@nestjs/common';

import { StudentsModule } from './students/students.module';
import { TeacherModule } from './teachers/teachers.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [StudentsModule, TeacherModule, ProductsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
