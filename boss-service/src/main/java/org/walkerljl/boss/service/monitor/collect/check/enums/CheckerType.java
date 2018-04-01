package org.walkerljl.boss.service.monitor.collect.check.enums;

/**
 * Checker类型
 *
 * @author lijunlin
 */
public enum CheckerType {

    /**
     * HTTP
     */
    HTTP(1);

    private int value;

    CheckerType(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }
}
