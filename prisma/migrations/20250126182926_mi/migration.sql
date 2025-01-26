-- AlterTable
ALTER TABLE `Patient` ADD COLUMN `evaluacionBoiquimica` JSON NULL,
    MODIFY `heredofamiliares` JSON NULL,
    MODIFY `personalesPatologicos` JSON NULL,
    MODIFY `personalesNPatologicos` JSON NULL,
    MODIFY `ginecoObstretricos` JSON NULL,
    MODIFY `trastornosGastroinstestinales` JSON NULL,
    MODIFY `habitosAlimentacion` JSON NULL,
    MODIFY `redordatorio24Horas` JSON NULL,
    MODIFY `indicadorAntropometico` JSON NULL,
    MODIFY `indicadoresBioquimicos` JSON NULL;
