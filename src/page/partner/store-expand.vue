<style scoped>
    .expand-row{
        margin-bottom: 16px;
    }
    .expand-key{
        font-weight: bold;
    }
</style>
<template>
    <div>
        <Row class="expand-row">
            <Col span="12">
                <span class="expand-key">地址: </span>
                <span class="expand-value">{{ row.address }}</span>
            </Col>
        </Row>     
    </div>
</template>
<script>
    export default {
        props: {
            row: Object
        }
    };
</script>