# 清理输入数据

plainToInstance

# 数组的存储

# put 和 patch

# 启用全局管道

过滤掉除 dto 中的数据
![alt text](image-2.png)
![alt text](image-3.png)

## TODO

1. 用户菜单权限
2. 权限指令
3. 动态路由
4. 二级路由
5. icon
6. 顶部工具栏

# npm-check

- npm install npm-check -g
- npm-check -u

一、核心概念与架构

1. Nest.js的核心特点是什么？和Express/Koa的区别？

○ 答案：Nest.js是一个基于TypeScript的渐进式框架，借鉴Angular的模块化、依赖注入（DI）和装饰器语法，提供分层架构（Controller/Service/Module）。与Express/Koa相比，Nest.js更强调架构规范，内置DI容器、拦截器、管道等企业级功能，适合大型应用。

2. 解释Nest.js中的模块（Module）、控制器（Controller）、服务（Provider）的作用。
   ○ 答案：
   ■ 模块：用@Module装饰的类，组织应用结构，通过imports、providers、controllers管理依赖。
   ■ 控制器：处理HTTP请求，定义路由，通过@Get、@Post等装饰器映射端点。
   ■ 服务：封装业务逻辑，通过@Injectable装饰，由DI注入到控制器或其他服务中。
3. 依赖注入（DI）在Nest.js中如何工作？
   ○ 答案：DI通过构造函数自动注入依赖实例。Nest的IoC容器管理Provider的生命周期（默认单例），例如在模块的providers中注册服务，控制器中通过构造函数声明依赖。

二、请求处理流程与装饰器

1. 中间件、守卫、管道、拦截器、异常过滤器的执行顺序及区别？
   ○ 答案：执行顺序为 中间件 → 守卫 → 管道 → 拦截器（前置） → 控制器 → 拦截器（后置） → 异常过滤器。
   ■ 中间件：处理请求/响应对象（如日志、CORS）。
   ■ 守卫：权限验证（如角色检查）。
   ■ 管道：数据验证与转换（如DTO校验）。
   ■ 拦截器：包裹方法执行，处理数据流（如统一响应格式）。
   ■ 异常过滤器：捕获全局或特定异常。
2. 如何自定义一个管道进行输入验证？
   ○ 答案：实现PipeTransform接口，使用@Injectable装饰。例如：
   typescript
   复制
   @Injectable()
   class ValidationPipe implements PipeTransform {
   transform(value: any, metadata: ArgumentMetadata) {
   if (!value) throw new BadRequestException('Invalid data');
   return value;
   }
   }
   在控制器方法参数使用@Body(new ValidationPipe())。

三、高级特性与集成

1. 如何在Nest.js中实现微服务？
   ○ 答案：使用@nestjs/microservices包，选择传输层（如TCP、Redis、Kafka）。示例：
   typescript
   复制
   // 主服务
   const app = await NestFactory.createMicroservice(AppModule, {
   transport: Transport.TCP,
   options: { port: 3001 },
   });

// 客户端
const client = app.get<ClientProxy>('MATH_SERVICE');
client.send('sum', [1, 2]).subscribe(); 2. 如何集成JWT实现身份验证？
○ 答案：使用@nestjs/jwt和@nestjs/passport：
ⅰ. 创建AuthModule，注册JwtModule。
ⅱ. 实现JwtStrategy继承Passport的Strategy。
ⅲ. 使用AuthGuard保护路由，在控制器中通过@UseGuards(JwtAuthGuard)应用。

四、数据库与测试

1. 如何用TypeORM在Nest.js中操作数据库？
   ○ 答案：
   ■ 安装@nestjs/typeorm和typeorm。
   ■ 在模块中导入TypeOrmModule.forRoot()配置连接。
   ■ 定义实体类并用@Entity装饰，通过@InjectRepository()注入Repository。
2. 如何进行单元测试和集成测试？
   ○ 答案：
   ■ 单元测试：使用Test.createTestingModule模拟模块，Mock依赖（如Service）。
   ■ 集成测试：用supertest发起HTTP请求，测试完整链路。
   typescript
   复制
   describe('UserController', () => {
   let app: INestApplication;

beforeAll(async () => {
const module = await Test.createTestingModule({
imports: [UserModule],
}).compile();
app = module.createNestApplication();
await app.init();
});
});

五、性能与优化

1. 如何优化Nest.js应用的性能？
   ○ 答案：
   ■ 使用缓存（如Redis模块@nestjs/cache-manager）。
   ■ 启用压缩中间件（compression）。
   ■ 避免阻塞操作，使用异步/await。
   ■ 集群模式（利用Node.js的cluster模块）。

六、项目经验与设计

1. 你在项目中如何设计可维护的Nest.js架构？
   ○ 答案：分层结构（Controller-Service-Repository），模块按功能划分（如UserModule、OrderModule），共用模块抽象（如SharedModule）。使用DTO验证、全局异常过滤统一响应格式，结合Swagger文档。

高频深入问题
● 动态模块的作用？如何创建？
○ 动态模块允许传递配置参数（如数据库连接配置），通过register()或forRootAsync()方法返回模块定义。
● 如何实现跨模块共享服务？
○ 在提供服务的模块中导出服务（exports: [UserService]），并在消费模块中导入该模块。
● 自定义装饰器的应用场景？
○ 例如@User()装饰器快速获取请求中的用户信息：
typescript
复制
export const User = createParamDecorator((data: string, ctx: ExecutionContext) => {
const request = ctx.switchToHttp().getRequest();
return data ? request.user[data] : request.user;
});
