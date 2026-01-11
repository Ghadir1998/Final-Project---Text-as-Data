<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:tei="http://www.tei-c.org/ns/1.0"
    exclude-result-prefixes="tei"
    version="1.0">

    <xsl:template match="tei:TEI">
        <div class="row">
            <div class="col">
                <h4>About the manuscript page:</h4>
                <div class="meta-block">
                    <xsl:value-of select="normalize-space(string(//tei:sourceDesc))"/>
                </div>
                <div class="meta-block">
                    <xsl:value-of select="normalize-space(string(//tei:licence))"/>
                </div>
            </div>

            <div class="col">
                <h4>Statistics:</h4>
                <ul>
                    <li>Total number of modifications (adds + dels):
                        <strong><xsl:value-of select="count(//tei:del | //tei:add)"/></strong>
                    </li>
                    <li>Number of additions:
                        <strong><xsl:value-of select="count(//tei:add)"/></strong>
                    </li>
                    <li>Number of deletions:
                        <strong><xsl:value-of select="count(//tei:del)"/></strong>
                    </li>
                    <li>Mary Shelley additions (#MWS):
                        <strong><xsl:value-of select="count(//tei:add[@hand='#MWS'])"/></strong>
                    </li>
                    <li>Mary Shelley deletions (#MWS):
                        <strong><xsl:value-of select="count(//tei:del[@hand='#MWS'])"/></strong>
                    </li>
                    <li>Percy Shelley additions (#PBS):
                        <strong><xsl:value-of select="count(//tei:add[@hand='#PBS'])"/></strong>
                    </li>
                    <li>Percy Shelley deletions (#PBS):
                        <strong><xsl:value-of select="count(//tei:del[@hand='#PBS'])"/></strong>
                    </li>
                </ul>
            </div>
        </div>
        <hr/>
    </xsl:template>

</xsl:stylesheet>
