<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:tei="http://www.tei-c.org/ns/1.0"
    exclude-result-prefixes="tei"
    version="1.0">

    <xsl:template match="tei:teiHeader"/>

    <xsl:template match="tei:body">
        <div class="row">
            <div class="col-3"><br/><br/><br/><br/><br/>
                <xsl:for-each select="//tei:add[@place = 'marginleft']">
                    <div class="marginLeft">
                        <xsl:choose>
                            <xsl:when test="parent::tei:del">
                                <del>
                                    <xsl:attribute name="class">
                                        <xsl:value-of select="@hand"/>
                                    </xsl:attribute>
                                    <xsl:apply-templates/>
                                </del>
                                <br/>
                            </xsl:when>
                            <xsl:otherwise>
                                <span>
                                    <xsl:attribute name="class">
                                        <xsl:value-of select="@hand"/>
                                    </xsl:attribute>
                                    <xsl:apply-templates/>
                                </span>
                                <br/>
                            </xsl:otherwise>
                        </xsl:choose>
                    </div>
                </xsl:for-each>
            </div>

            <div class="col-9">
                <div class="transcription">
                    <xsl:apply-templates select="//tei:div"/>
                </div>
            </div>
        </div>
    </xsl:template>

    <xsl:template match="tei:div">
        <div class="tei-page">
            <xsl:apply-templates/>
        </div>
    </xsl:template>

    <xsl:template match="tei:p">
        <p><xsl:apply-templates/></p>
    </xsl:template>

    <xsl:template match="tei:lb">
        <br/>
    </xsl:template>

    <xsl:template match="tei:l">
        <div class="tei-line"><xsl:apply-templates/></div>
    </xsl:template>

    <xsl:template match="tei:list">
        <div class="tei-list"><xsl:apply-templates/></div>
    </xsl:template>

    <xsl:template match="tei:item">
        <div class="tei-item"><xsl:apply-templates/></div>
    </xsl:template>

    <xsl:template match="tei:hi[@rend = 'u']">
        <u><xsl:apply-templates/></u>
    </xsl:template>

    <xsl:template match="tei:hi[@rend = 'sup']">
        <sup><xsl:apply-templates/></sup>
    </xsl:template>

    <xsl:template match="tei:hi[@rend = 'circled']">
        <span class="tei-circled"><xsl:apply-templates/></span>
    </xsl:template>

    <xsl:template match="tei:metamark">
        <span class="tei-metamark">
            <xsl:apply-templates/>
        </span>
    </xsl:template>

    <xsl:template match="tei:note">
        <span class="tei-note"><xsl:apply-templates/></span>
    </xsl:template>

    <xsl:template match="tei:unclear">
        <span class="tei-unclear"><xsl:apply-templates/></span>
    </xsl:template>

    <xsl:template match="tei:gap">
        <span class="tei-gap">[…]</span>
    </xsl:template>

    <xsl:template match="tei:choice">
        <span class="tei-choice">
            <xsl:value-of select="tei:corr"/>
        </span>
    </xsl:template>

    <xsl:template match="tei:del">
        <del class="tei-del">
            <xsl:attribute name="data-hand"><xsl:value-of select="@hand"/></xsl:attribute>
            <xsl:attribute name="data-deltype"><xsl:value-of select="@type"/></xsl:attribute>
            <xsl:apply-templates/>
        </del>
    </xsl:template>

    <xsl:template match="tei:add[@place = 'marginleft']">
        <span class="marginAdd tei-add" data-place="marginleft">
            <xsl:attribute name="data-hand"><xsl:value-of select="@hand"/></xsl:attribute>
            <xsl:attribute name="data-addtype"><xsl:value-of select="@type"/></xsl:attribute>
            <xsl:apply-templates/>
        </span>
    </xsl:template>

    <xsl:template match="tei:add[@place = 'supralinear']">
        <sup class="supraAdd tei-add" data-place="supralinear">
            <xsl:attribute name="data-hand"><xsl:value-of select="@hand"/></xsl:attribute>
            <xsl:attribute name="data-addtype"><xsl:value-of select="@type"/></xsl:attribute>
            <xsl:apply-templates/>
        </sup>
    </xsl:template>

    <xsl:template match="tei:add[@place = 'overwritten']">
        <span class="tei-add tei-add-overwritten" data-place="overwritten">
            <xsl:attribute name="data-hand"><xsl:value-of select="@hand"/></xsl:attribute>
            <xsl:attribute name="data-addtype"><xsl:value-of select="@type"/></xsl:attribute>
            <xsl:apply-templates/>
        </span>
    </xsl:template>

    <xsl:template match="tei:add[@place = 'intralinear']">
        <span class="tei-add tei-add-inline" data-place="intralinear">
            <xsl:attribute name="data-hand"><xsl:value-of select="@hand"/></xsl:attribute>
            <xsl:attribute name="data-addtype"><xsl:value-of select="@type"/></xsl:attribute>
            <xsl:apply-templates/>
        </span>
    </xsl:template>

    <xsl:template match="tei:add">
        <span class="tei-add" data-place="other">
            <xsl:attribute name="data-hand"><xsl:value-of select="@hand"/></xsl:attribute>
            <xsl:attribute name="data-addtype"><xsl:value-of select="@type"/></xsl:attribute>
            <xsl:apply-templates/>
        </span>
    </xsl:template>

</xsl:stylesheet>