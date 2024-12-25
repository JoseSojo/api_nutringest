"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguajeService = void 0;
const common_1 = require("@nestjs/common");
let LanguajeService = class LanguajeService {
    GetPayload() { }
    GetAllPayloads() { }
    GetTranslate() {
        return {
            ACTIONS: {
                DANGER: {
                    CREATE: `Error al crear.`,
                    DELETE: `Error al eliminar.`,
                    LIST: `Error al consultar.`,
                    RECOVERY: `Error al recuperar.`,
                    SHOW: `Error al buscar.`,
                    UPDATE: `Error al actualizar.`,
                    LOGIN: `Error al iniciar sesión.`,
                    REGISTER: `Error al crear una cuenta.`,
                    VALIDATIONS: {
                        EMAIL_IN_USE: `Error, correo en uso.`,
                        PASSWORD_FREE: `Error, contraseña muy débil.`,
                        USERNAME_IN_USE: `Error, usuario en uso`
                    }
                },
                SUCCESS: {
                    CREATE: `Creación exitosa.`,
                    DELETE: `Eliminación exitosa.`,
                    LIST: `Consulta exitosa.`,
                    RECOVERY: `Recuperación exitosa.`,
                    SHOW: `Busqueda exitosa.`,
                    UPDATE: `Actualización exitosa.`,
                    LOGIN: `Inicio de sesión exitoso.`,
                    REGISTER: `Registro exitoso`
                },
                NOT_FOUND: `No encontrado.`,
                NOT_PERMIT: `No permitido.`,
                NOT_VALID: `No valid.`,
            },
            EVENTS: {},
            HISTORY: {},
            TITLES: {
                DOWNLOAD: `Descargar`,
                INPUT: {
                    CI: `Cédula`,
                    PERMIT: `Permisos`,
                    PASSWORD: `Contraseña`,
                    USERNAME: `Usuario`,
                    CATEGORY: `Categoría`,
                    ID: `Identificador`,
                    DESCRIPTION: `Descripción`,
                    EMAIL: `Correo electrónico`,
                    LASTNAME: `Apellido`,
                    NAME: `Nombre`
                },
                CREATE: `Crear`,
                DELETE: `Eliminar`,
                LIST: `Lista`,
                RECOERY: `Recuperar`,
                REPORT: `Reporte`,
                UNIQUE: `Ver`,
                UPDATE: `Actualizar`,
                NAV: {
                    LOGOUT: `salir`,
                    PROFILE: `perfil`,
                },
                SLIDE: {
                    PERMIT: `Permisos`,
                    ANALYSIS: `Análisis`,
                    CONFIG: {
                        INDEX: `Configuraciones`,
                        CATEGORY: `Categoria`,
                        LINE: `Líneas de investigación`,
                        PROGRAM: `Programas`
                    },
                    DASHBOARD: `Panel de control`,
                    PROJECTS: `Proyectos`,
                    REPORT: `Reportes`,
                    USERS: `Usuarios`
                }
            },
            REPORTS: {
                PROJECT: {
                    many: `Proyectos`,
                    project: `Proyectos`,
                    unique: `Proyecto único`,
                },
                CATEGORY: {
                    many: `Categorías`,
                    project: `Categorías en proyectos`,
                    unique: `Cateoría única`,
                },
                LINE: {
                    many: `Líneas de investigación`,
                    project: `Líneas de investigación en proyectos`,
                    unique: `Línea de investigación única`,
                },
                PROGRAM: {
                    many: `Programas`,
                    project: `Programas en proyectos`,
                    unique: `Programa única`,
                },
                USER: {
                    many: `Usuarios`,
                    project: `Usuarios en proyectos`,
                    unique: `Usuario única`,
                }
            }
        };
    }
};
exports.LanguajeService = LanguajeService;
exports.LanguajeService = LanguajeService = __decorate([
    (0, common_1.Injectable)()
], LanguajeService);
//# sourceMappingURL=languaje.service.js.map