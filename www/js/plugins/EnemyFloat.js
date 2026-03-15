/*:
 * @target MV MZ
 * @plugindesc 强制敌人立绘浮动效果 (BlackSouls 风格)
 * @author Gemini
 * @help 
 * 放入插件管理器并开启即可。
 */

(function() {
    // 覆盖敌人图片的更新逻辑
    var _Sprite_Enemy_update = Sprite_Enemy.prototype.update;
    Sprite_Enemy.prototype.update = function() {
        _Sprite_Enemy_update.call(this);
        
        if (this._enemy) {
            // 初始化计数器（如果不存在）
            if (this._floatTimer === undefined) {
                this._floatTimer = 0;
                // 记录初始位置，防止它越飘越远
                this._baseY = this.y; 
            }

            // 增加计数
            this._floatTimer += 0.04; // 控制速度，越小越慢

            // 计算位移：使用正弦函数
            // Math.sin 的结果在 -1 到 1 之间
            // 乘以 10 表示上下浮动 10 个像素
            var offset = Math.sin(this._floatTimer) * 8;

            // 关键：修改 y 的同时确保不被其他逻辑覆盖
            // 在战斗中，Sprite_Enemy 的 y 经常被重设，所以我们每一帧都强制加上偏移
            this.y += offset;
        }
    };
})();